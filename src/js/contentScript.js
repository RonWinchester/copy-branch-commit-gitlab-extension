const copyBranchName = async () => {
  try {
    const text = `issue_${document.body.dataset.pageTypeId}`;
    await navigator.clipboard.writeText(text);
    console.log(`Copied to clipboard: ${text}`);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

const copyCommitMessage = async () => {
  try {
    const text = `${document.body.dataset.group}/${document.body.dataset.project}#${document.body.dataset.pageTypeId} ${document.querySelector('h2.title').textContent}`;
    await navigator.clipboard.writeText(text);
    console.log(`Copied to clipboard: ${text}`);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

if (document.body.dataset.page == "projects:issues:show") {
  let newButtonGroupOld = document.getElementById("copy-branch");

  if (!newButtonGroupOld) {
    let pageTitle = document.querySelector("ul.breadcrumbs-list li:last-child");
    let newButtonGroup = document.createElement("li");
    newButtonGroup.classList = "btn-group";
    newButtonGroup.id = "copy-branch";

    let buttonCopyBranch = document.createElement("button");
    buttonCopyBranch.type = "button";
    buttonCopyBranch.title = "Copy branch name";
    buttonCopyBranch.classList = "btn";
    buttonCopyBranch.onclick = copyBranchName;
    buttonCopyBranch.innerHTML = `<svg aria-hidden="true" class="s16"><path fill-rule="evenodd" d="M1 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H6v2h4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1H6v3h4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1H5a1 1 0 0 1-1-1V6H2a1 1 0 0 1-1-1V1zm2 3V2h4v2H3z"></path></svg>`;

    let buttonCopyCommit = document.createElement("button");
    buttonCopyCommit.type = "button";
    buttonCopyCommit.title = "Copy Commit message";
    buttonCopyCommit.classList = "btn";
    buttonCopyCommit.onclick = copyCommitMessage;
    buttonCopyCommit.innerHTML = `<svg aria-hidden="true" class="s16"><path fill-rule="evenodd" d="M3 1h6.172a2 2 0 0 1 1.284.467l.13.119 2.828 2.828a2 2 0 0 1 .578 1.239l.008.175V14a1 1 0 0 1-.883.993L13 15H3a1 1 0 0 1-.993-.883L2 14V2a1 1 0 0 1 .883-.993L3 1h6.172H3zm6 2H4v10h8V6h-2a1 1 0 0 1-.993-.883L9 5V3zm-3 7h2a1 1 0 0 1 .117 1.993L8 12H6a1 1 0 0 1-.117-1.993L6 10zm4-3a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2h4z"></path></svg>`;

    newButtonGroup.appendChild(buttonCopyBranch);
    newButtonGroup.appendChild(buttonCopyCommit);

    pageTitle.parentNode.insertBefore(newButtonGroup, pageTitle.nextSibling);
  }
}