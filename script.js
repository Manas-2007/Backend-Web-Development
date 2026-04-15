class StackEngine {
    constructor() {
        this.stack = [];
        this.maxSize = 10;
        
        // DOM Elements
        this.stackContainer = document.getElementById('stack');
        this.terminal = document.getElementById('terminal'); 
        this.input = document.querySelector('input');
        
        // Target the Emerald Output Display span
        this.outputDisplay = document.querySelector('.text-emerald-400 span'); 
        
        this.init();
    }

    init() {
        this.stackContainer.innerHTML = '';
        this.updateOutput("System Ready...");
        this.log("Kernel initialized. Visual buffers cleared.", "system");
    }

    // Helper: Update the main output region text
    updateOutput(text) {
        if (this.outputDisplay) {
            this.outputDisplay.innerText = text;
        }
    }

    // Helper: Add line to the system terminal
    log(msg, type = 'info') {
        const colors = {
            info: 'text-white/40',
            success: 'text-emerald-400',
            error: 'text-rose-400',
            system: 'text-indigo-400'
        };
        const line = document.createElement('div');
        line.className = `${colors[type]} mb-1 text-[11px] font-mono`;
        line.innerHTML = `> ${msg}`;
        
        if (this.terminal) {
            this.terminal.appendChild(line);
            this.terminal.scrollTop = this.terminal.scrollHeight;
        }
    }

    // Render the stack items into the UI
    render() {
        this.stackContainer.innerHTML = '';
        this.stack.forEach((val) => {
            const item = document.createElement('div');
            item.className = 'stack-item py-3 rounded-xl text-center font-bold text-xs w-full';
            item.innerText = val;
            this.stackContainer.appendChild(item);
        });
    }

    push(val) {
        const value = (val !== undefined && val !== null) ? val : this.input.value.trim();
        
        if (value === "") {
            this.updateOutput("Error: Input is empty");
            this.log("PUSH_FAILED: Null input", "error");
            return;
        }
        if (this.stack.length >= this.maxSize) {
            this.updateOutput("Error: Stack Overflow");
            this.log("PUSH_FAILED: Stack full", "error");
            return;
        }

        this.stack.push(value);
        this.render();
        this.updateOutput(`Pushed: ${value}`);
        this.log(`PUSHED: [${value}]`, "success");
        this.input.value = ''; 
    }

    pop() {
        if (this.stack.length === 0) {
            this.updateOutput("Error: Underflow");
            this.log("POP_FAILED: Empty stack", "error");
            return;
        }
        const removed = this.stack.pop();
        this.updateOutput(`Popped: ${removed}`);
        this.log(`POPPED: [${removed}]`, "system");
        this.render();
    }

    showTop() {
        if (this.stack.length === 0) {
            this.updateOutput("Stack is empty");
            return;
        }
        const top = this.stack[this.stack.length - 1];
        this.updateOutput(`Top Element: ${top}`);
        this.log(`PEEK: Top is ${top}`, "info");
    }

    // Traverse: Shows all elements Top -> Bottom
    traverseStack() {
        if (this.stack.length === 0) {
            this.updateOutput("Empty: Nothing to traverse");
            return;
        }
        const traversal = [...this.stack].reverse();
        const outputStr = traversal.join(" ➔ ");
        this.updateOutput(`Traverse (Top to Bottom): ${outputStr}`);
        this.log("Traversal complete", "success");
    }

    // Even Filter Logic
    showEven() {
        if (this.stack.length === 0) {
            this.updateOutput("Empty Stack: No evens");
            return;
        }
        const evens = this.stack.filter(n => !isNaN(n) && Number(n) % 2 === 0);
        const result = evens.length > 0 ? evens.join(", ") : "None";
        this.updateOutput(`Even Elements: [ ${result} ]`);
        this.log(`Filter Applied: Even Numbers`, "info");
    }

    // Odd Filter Logic
    showOdd() {
        if (this.stack.length === 0) {
            this.updateOutput("Empty Stack: No odds");
            return;
        }
        const odds = this.stack.filter(n => !isNaN(n) && Number(n) % 2 !== 0);
        const result = odds.length > 0 ? odds.join(", ") : "None";
        this.updateOutput(`Odd Elements: [ ${result} ]`);
        this.log(`Filter Applied: Odd Numbers`, "info");
    }

    // Postfix Evaluation Logic
    async evaluate() {
    const expr = this.input.value.trim();

    if (!expr) {
        this.updateOutput("Error: No expression");
        return;
    }

    const tokens = expr.split(/\s+/);

    // Step 1: Use temporary stack (NOT UI stack)
    let tempStack = [];

    this.updateOutput("Evaluating...");
    this.log("Evaluation started...", "system");

    for (let t of tokens) {
        if (!isNaN(t)) {
            tempStack.push(Number(t));
        } else {
            if (tempStack.length < 2) {
                this.updateOutput("Invalid Postfix Expression");
                this.log("EVAL_ERROR: Not enough operands", "error");
                return;
            }

            const b = tempStack.pop();
            const a = tempStack.pop();
            let res = 0;

            switch (t) {
                case '+': res = a + b; break;
                case '-': res = a - b; break;
                case '*': res = a * b; break;
                case '/': res = a / b; break;
                default:
                    this.updateOutput("Invalid Operator");
                    return;
            }

            tempStack.push(res);
        }
    }

    // Step 2: Final validation
    if (tempStack.length !== 1) {
        this.updateOutput("Invalid Expression");
        this.log("EVAL_ERROR: Final stack not size 1", "error");
        return;
    }

    const final = tempStack[0];

    // Step 3: Update REAL stack (UI)
    this.stack = [final];   // only one element
    this.render();

    // Step 4: Show output
    this.updateOutput(`Final Result: ${final}`);
    this.log(`COMPUTE: Result = ${final}`, "success");

    this.input.value = '';
}

    
isEmpty() {
    const result = this.stack.length === 0;
    this.updateOutput(`Is Empty: ${result}`);
    this.log(`CHECK: Stack is ${result ? "Empty" : "Not Empty"}`, "info");
}

isFull() {
    const result = this.stack.length === this.maxSize;
    this.updateOutput(`Is Full: ${result}`);
    this.log(`CHECK: Stack is ${result ? "Full" : "Not Full"}`, "info");
}
}

// Button Interaction Controller
document.addEventListener('DOMContentLoaded', () => {
    const engine = new StackEngine();

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const cmd = btn.innerText.toLowerCase();

        // Mapping button text to Engine functions
        if (cmd.includes('push')) {
            engine.push();
        } else if (cmd.includes('pop')) {
            engine.pop();
        } else if (cmd.includes('peek') || cmd.includes('top')) {
            engine.showTop();
        } else if (cmd.includes('evaluate')) {
            engine.evaluate();
        } else if (cmd.includes('traverse')) {
            engine.traverseStack();
       } else if (cmd.includes('isempty')) {
            engine.isEmpty();
        } else if (cmd.includes('isfull')) {
            engine.isFull();
        } else if (cmd.includes('even')) {
            engine.showEven();
        } else if (cmd.includes('odd')) {
            engine.showOdd();
        }
            });
});
