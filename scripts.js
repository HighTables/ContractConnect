const art = document.getElementById('asciiArt');
const contract = document.getElementById('contract');
const buttons = document.getElementById('buttons');
const response = document.getElementById('response');

const contractText = `
[Contract – Stealth Acquisition]

Objective: Retrieve Valuable Data Chip

Location: Mansion, Chrome Heights, Nexus-9

Codename: "Silent Silver Heist"

Details: Mansion is a pinnacle of technological marvel in the Chrome Heights. Data chip believed to be held in a high-security vault within the heart of the mansion.

Bounty: 500 Pixels

Terms:
- Stealth is paramount.
- No casualties or disturbances permitted.
- Failure to maintain discretion will result in contract termination.
- Retrieval of the data chip required for payout.
- Under no circumstances should the chip be accessed or tampered with.

Window of Opportunity:
- Mansion will be hosting an exclusive party.
- High profile guests will be in attendance.
- Security will be on heightened alert but will also be preoccupied.
- This is the optimal time to infiltrate.

Recommendations:
- Prepare for high-level electronic countermeasures.
- Familiarize oneself with the mansion’s blueprint.
- Be wary of private security personnel and automated defense mechanisms.

Contract Issuer: Anonymous

Endorsement:
“This mission is not for the unskilled. The reward may seem low, but the value of the data chip is immeasurable. You are not the only one seeking it. Tread carefully, and trust no one.”

Note: By accepting, the contractor agrees to the terms and understands the high stakes of this mission. Any breach of terms will lead to immediate nullification of the contract and potential legal consequences.

Confirmation:
Upon accepting this contract, one's fingerprint and retinal scan will be recorded. Discretion is paramount.

Good fortune be with you.
`;

const chars = Array.from(contractText);

function showArt() {
    const lines = art.textContent.split('\n');
    art.textContent = '';

    let index = 0;

    function showLine() {
        if (index < lines.length) {
            art.textContent += lines[index] + '\n';
            index++;
            setTimeout(showLine, 5);
        } else {
            setTimeout(() => {
                art.style.display = 'none';
                showContract();
            }, 2000);
        }
    }

    art.style.display = 'block';
    showLine();
}

function showContract() {
    contract.style.display = 'inline';
    
    let index = 0;

    function showChar() {
        if (index < chars.length) {
            contract.textContent += chars[index];
            index++;
            setTimeout(showChar, 10); // Adjust for speed
        } else {
            buttons.style.display = 'block';
        }
    }

    showChar();
}

function animateLoading(nextAction) {
    const periods = ['.', '..', '...'];
    let periodIndex = 0;
    let repeatCount = 0;

    function updatePeriods() {
        if (repeatCount >= 2 && periodIndex >= 2) {
            response.textContent = "CONTRACT ACCEPTED";
            setTimeout(nextAction, 2000);
            return;
        }
        response.textContent = "LOADING" + periods[periodIndex];
        periodIndex = (periodIndex + 1) % periods.length;
        if (periodIndex === 0) {
            repeatCount++;
        }
        setTimeout(updatePeriods, 500);
    }
    updatePeriods();
}

function acceptContract() {
    contract.style.display = 'none';
    buttons.style.display = 'none';

    response.style.display = 'block';
    animateLoading(() => {
        response.textContent = "HAPPY HUNTING";
        setTimeout(() => {
            response.style.display = 'none';
        }, 3000);
    });
}

function declineContract() {
    contract.style.display = 'none';
    buttons.style.display = 'none';

    showResponse("DELETING...", () => {
        document.body.style.backgroundColor = 'black';
    });
}

function showResponse(message, nextAction) {
    response.textContent = message;
    response.style.display = 'block';

    setTimeout(() => {
        response.style.display = 'none';
        if (nextAction) nextAction();
    }, 3000);
}

showArt();
