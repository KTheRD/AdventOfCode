// ==UserScript==
// @name         AOC Stats
// @match        https://adventofcode.com/*/stats
// ==/UserScript==

let previousTotal = null;

const day1Both = parseInt(
  [...document.querySelectorAll(".stats > a")].at(-1).children[0].textContent,
  10,
);
const day1Total =
  parseInt(
    [...document.querySelectorAll(".stats > a")].at(-1).children[1].textContent,
    10,
  ) + day1Both;

[...document.querySelectorAll(".stats > a")].reverse().forEach((t) => {
  const both = parseInt(t.children[0].textContent, 10);
  const firstOnly = parseInt(t.children[1].textContent, 10);
  const total = both + firstOnly;
  const bothPercentage = (both / total) * 100;
  const bothPercentageAll = (both / day1Total) * 100;
  const totalPercentageAll = (total / day1Total) * 100;

  const span = document.createElement("span");
  span.textContent = `${bothPercentage.toFixed(2)}%  `;
  span.style.color = "#cc9999";
  t.insertBefore(span, t.children[t.children.length - 2]);

  const span2 = document.createElement("span");
  span2.textContent = ("     " + total).slice(-6) + "  ";
  span2.style.color = "#99cc99";
  t.insertBefore(span2, t.children[t.children.length - 2]);

  const span3 = document.createElement("span");
  const diff = previousTotal === total ? 0 : total - previousTotal;
  const diffText = (diff < 0 ? "-" : "+") + Math.abs(diff);
  span3.textContent = ("     " + diffText).slice(-6) + "  ";
  span3.style.color = "#99cc99";
  t.insertBefore(span3, t.children[t.children.length - 2]);

  const span4 = document.createElement("span");
  span4.textContent = `${totalPercentageAll.toFixed(2)}%  `.padStart(9, " ");
  span4.style.color = "#cc9999";
  t.insertBefore(span4, t.children[t.children.length - 2]);

  const span5 = document.createElement("span");
  span5.textContent = `${bothPercentageAll.toFixed(2)}%  `.padStart(9, " ");
  span5.style.color = "#cc9999";
  t.insertBefore(span5, t.children[t.children.length - 2]);

  console.log(span4, span5);

  previousTotal = total;
});

const target = document.querySelector(".stats");
const spaces =
  document.querySelector(".stats > a").textContent.indexOf("%") - 2;
target.innerHTML = `<div>${" ".repeat(spaces)}2*%  users   change  %Day1     2*%Day1</div>${target.innerHTML}<div>${" ".repeat(spaces)}2*%  users   change  %Day1     2*%Day1</div>`;
