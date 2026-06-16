let leads = [];

// Load leads from backend
async function loadLeads() {
    try {
        const response = await fetch("http://localhost:5000/api/leads");
        leads = await response.json();
        displayLeads();
    } catch (error) {
        console.error("Error loading leads:", error);
    }
}

// Add Lead
async function addLead() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let source = document.getElementById("source").value;
    let notes = document.getElementById("notes").value;

    if (name === "" || email === "" || source === "") {
        alert("Please fill all required fields");
        return;
    }

    const leadData = {
        name,
        email,
        source,
        notes,
        status: "New"
    };

    try {
        await fetch("http://localhost:5000/api/leads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(leadData)
        });

        loadLeads();

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("source").value = "";
        document.getElementById("notes").value = "";

    } catch (error) {
        console.error(error);
    }
}

// Update Status
async function updateStatus(id, currentStatus) {

    let newStatus = currentStatus;

    if (currentStatus === "New") {
        newStatus = "Contacted";
    } else if (currentStatus === "Contacted") {
        newStatus = "Converted";
    }

    try {
        await fetch(`http://localhost:5000/api/leads/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: newStatus
            })
        });

        loadLeads();

    } catch (error) {
        console.error(error);
    }
}

// Delete Lead
async function deleteLead(id) {

    if (!confirm("Delete this lead?")) return;

    try {
        await fetch(`http://localhost:5000/api/leads/${id}`, {
            method: "DELETE"
        });

        loadLeads();

    } catch (error) {
        console.error(error);
    }
}

function getStatusClass(status) {
    if (status === "New") return "new";
    if (status === "Contacted") return "contacted";
    return "converted";
}

function updateStats() {

    document.getElementById("totalLeads").textContent =
        leads.length;

    document.getElementById("newLeads").textContent =
        leads.filter(l => l.status === "New").length;

    document.getElementById("contactedLeads").textContent =
        leads.filter(l => l.status === "Contacted").length;

    document.getElementById("convertedLeads").textContent =
        leads.filter(l => l.status === "Converted").length;
}

function displayLeads(filteredLeads = leads) {

    let table = document.getElementById("leadTable");

    table.innerHTML = "";

    filteredLeads.forEach((lead) => {

        table.innerHTML += `
        <tr>
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.source}</td>

            <td>
                <span class="status ${getStatusClass(lead.status)}">
                    ${lead.status}
                </span>
            </td>

            <td>${lead.notes}</td>

            <td>
                <button class="action-btn update-btn"
                    onclick="updateStatus('${lead._id}','${lead.status}')">
                    Update
                </button>

                <button class="action-btn delete-btn"
                    onclick="deleteLead('${lead._id}')">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    updateStats();
}

function searchLead() {

    let searchText =
        document.getElementById("search")
        .value
        .toLowerCase();

    let filtered = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchText) ||
        lead.email.toLowerCase().includes(searchText) ||
        lead.source.toLowerCase().includes(searchText)
    );

    displayLeads(filtered);
}

// Initial Load
loadLeads();