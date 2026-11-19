const priorities = ["High", "Medium", "Low"];
const attentionPriorities = priorities.slice(0, 2);
const categories = [...priorities, "Unassigned"];
const storageKey = "equipment-requests";
const sampleRequests = [
  { id: 1, equipment: "Replacement barcode scanner", priority: "High", status: "Open" },
  { id: 2, equipment: "USB-C docking station", priority: "Medium", status: "Open" },
  { id: 3, equipment: "Spare keyboard", priority: "Low", status: "Open" },
  { id: 4, equipment: "Warehouse label printer", priority: "High", status: "Completed" },
  { id: 5, equipment: "Conference room adapter", status: "Open" },
  { id: 6, equipment: "Inventory tablet", priority: "Medium", status: "Completed" },
];

const filter = document.querySelector("#filter");
const overview = document.querySelector("#overview");
const rows = document.querySelector("#requests");
const empty = document.querySelector("#empty");
const results = document.querySelector("#results");
const form = document.querySelector("#add");
const feedback = document.querySelector("#feedback");
let requests = loadRequests();

function loadRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(saved)) return saved;
  } catch {
    // The app can still run when browser storage is unavailable.
  }
  return sampleRequests;
}

function saveRequests(nextRequests) {
  requests = nextRequests;
  try {
    localStorage.setItem(storageKey, JSON.stringify(requests));
    feedback.hidden = true;
  } catch {
    feedback.textContent = "Changes are available until this page is reloaded.";
    feedback.hidden = false;
  }
  render();
}

function priorityOf(request) {
  return priorities.includes(request.priority) ? request.priority : "Unassigned";
}

function matchesFilter(request) {
  const selected = filter.value;
  if (selected === "all") return true;
  if (selected === "attention") {
    return request.status !== "Completed" && attentionPriorities.includes(priorityOf(request));
  }
  return priorityOf(request) === selected;
}

function element(tag, text) {
  const node = document.createElement(tag);
  node.textContent = text;
  return node;
}

function priorityBadge(priority) {
  const badge = element("span", priority);
  badge.className = `badge ${priority.toLowerCase()}`;
  return badge;
}

function requestRow(request) {
  const row = document.createElement("tr");
  const priority = priorityOf(request);
  const priorityCell = document.createElement("td");
  priorityCell.append(priorityBadge(priority));

  const select = document.createElement("select");
  select.setAttribute("aria-label", `Change priority for request ${request.id}`);
  const choices = priority === "Unassigned" ? ["Unassigned", ...priorities] : priorities;
  for (const choice of choices) {
    const option = new Option(choice, choice);
    option.disabled = choice === "Unassigned";
    select.add(option);
  }
  select.value = priority;
  select.addEventListener("change", () => {
    const label = select.getAttribute("aria-label");
    saveRequests(requests.map(item => item === request ? { ...item, priority: select.value } : item));
    const updated = rows.querySelector(`select[aria-label="${CSS.escape(label)}"]`);
    (updated ?? filter).focus();
  });

  const editCell = document.createElement("td");
  editCell.append(select);
  row.append(element("td", request.id), element("td", request.equipment), priorityCell,
    element("td", request.status), editCell);
  return row;
}

function render() {
  const counts = Object.fromEntries(categories.map(priority => [priority, 0]));
  for (const request of requests) counts[priorityOf(request)] += 1;
  overview.replaceChildren(...categories.map(priority => {
    const card = document.createElement("div");
    const label = document.createElement("dt");
    label.append(priorityBadge(priority));
    card.append(label, element("dd", counts[priority]));
    return card;
  }));

  const visible = requests.filter(matchesFilter);
  rows.replaceChildren(...visible.map(requestRow));
  empty.hidden = visible.length > 0 || filter.value === "all";
  results.hidden = visible.length === 0;
}

filter.addEventListener("change", render);
document.querySelector("#clear").addEventListener("click", () => {
  filter.value = "all";
  render();
  filter.focus();
});

form.addEventListener("submit", event => {
  event.preventDefault();
  const equipment = form.elements.equipment.value.trim();
  if (!equipment) {
    form.elements.equipment.reportValidity();
    return;
  }
  const id = requests.reduce((largest, request) => Math.max(largest, request.id), 0) + 1;
  saveRequests([...requests, { id, equipment, priority: form.elements.priority.value, status: "Open" }]);
  form.reset();
});

filter.value = "all";
render();
