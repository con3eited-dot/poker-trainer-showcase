"use strict";

// This fixed example explains the replay UI; no game or strategy engine runs here.
const steps = [
  { street: "翻前 · 行动前", title: "从翻前开始", pot: 1.5, stack: 106, board: [], note: "公共牌尚未发出", description: "行动前底池为 1.5 BB，你持 J♦ 2♣，本手起始筹码为 106 BB。", action: "本节点行动：加注至 3 BB" },
  { street: "翻牌 · 行动前", title: "三张公共牌，新的局面", pot: 7.5, stack: 103, board: ["3♠", "3♥", "A♦"], note: "只展示此时已发出的 3 张公共牌", description: "翻前加注得到跟注。底池来到 7.5 BB，翻牌是 3♠ 3♥ A♦；本节点选择过牌。", action: "本节点行动：过牌 · 行动前底池 7.5 BB" },
  { street: "转牌 · 行动前", title: "再看一张，不提前看结果", pot: 7.5, stack: 103, board: ["3♠", "3♥", "A♦", "8♣"], note: "河牌尚未发出", description: "双方翻牌过牌。转牌发出 8♣，底池仍为 7.5 BB；本节点再次过牌。", action: "本节点行动：过牌 · 行动前底池 7.5 BB" },
  { street: "河牌 · 行动前", title: "最后一张，最后一次选择", pot: 7.5, stack: 103, board: ["3♠", "3♥", "A♦", "8♣", "2♥"], note: "公共牌已全部发出，结果尚未揭示", description: "双方转牌过牌。河牌发出 2♥，英雄持有两对；本节点下注 2 BB。这只是演示中的行动，不是策略建议。", action: "本节点行动：下注 2 BB · 行动前底池 7.5 BB" },
  { street: "本手结算", title: "分清投入、收回与净收益", pot: 11.5, stack: 112.5, board: ["3♠", "3♥", "A♦", "8♣", "2♥"], note: "结算展示最终已发公共牌", description: "对手跟注后，示例以英雄获胜结束。本手共投入 5 BB、收回 11.5 BB，净赢 6.5 BB；106 BB 起始筹码变为 112.5 BB。", action: "结算：投入 5 BB · 收回 11.5 BB · 净赢 +6.5 BB" }
];
let currentStep = 0;
const buttons = Array.from(document.querySelectorAll("[data-step]"));
const previous = document.getElementById("previous-step");
const next = document.getElementById("next-step");
function renderStep(index) {
  currentStep = Math.max(0, Math.min(steps.length - 1, index));
  const step = steps[currentStep];
  document.getElementById("street-label").textContent = step.street;
  document.getElementById("decision-title").textContent = step.title;
  document.getElementById("pot-value").textContent = step.pot;
  document.getElementById("stack-value").textContent = `${step.stack} BB`;
  document.getElementById("decision-description").textContent = step.description;
  document.getElementById("board-note").textContent = step.note;
  document.getElementById("action-summary").textContent = step.action;
  document.getElementById("step-count").textContent = `${currentStep + 1} / ${steps.length}`;
  const board = document.getElementById("board");
  board.replaceChildren();
  for (let cardIndex = 0; cardIndex < 5; cardIndex += 1) {
    const card = document.createElement("span");
    const value = step.board[cardIndex];
    card.className = "playing-card";
    if (value) {
      const suit = value.slice(-1);
      card.textContent = value.slice(0, -1);
      const symbol = document.createElement("span");
      symbol.textContent = suit;
      card.append(symbol);
      card.setAttribute("aria-label", value);
      if (suit === "♥" || suit === "♦") card.classList.add("red");
    } else {
      card.classList.add("empty");
      card.setAttribute("aria-hidden", "true");
    }
    board.append(card);
  }
  buttons.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === currentStep)));
  previous.disabled = currentStep === 0;
  next.disabled = currentStep === steps.length - 1;
}
buttons.forEach((button) => button.addEventListener("click", () => renderStep(Number(button.dataset.step))));
previous.addEventListener("click", () => renderStep(currentStep - 1));
next.addEventListener("click", () => renderStep(currentStep + 1));
document.querySelector(".replay-shell").addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    renderStep(currentStep + (event.key === "ArrowRight" ? 1 : -1));
  }
});
renderStep(0);
