const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");

dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("dragover", (e) => {
	e.preventDefault();
	dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
	dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
	e.preventDefault();
	dropZone.classList.remove("dragover");
	const files = e.dataTransfer.files;
	if (files.length) handleFile(files[0]);
});

fileInput.addEventListener("change", () => {
	if (fileInput.files.length) {
		handleFile(fileInput.files[0]);
	}
});

function handleFile(file) {
	if (!file.type.startsWith("image/")) {
		showError("Please select a valid image file!");
		return;
	}

	const reader = new FileReader();
	reader.onload = () => {
		previewContainer.innerHTML = `
          <img src="${reader.result}" alt="Preview Image" class="rounded-xl max-w-full max-h-64 object-contain mb-4 shadow-md" />

          <div class="flex flex-col items-center gap-2">
            <p class="text-lg font-semibold text-gray-700 truncate w-full" title="${file.name}">File name: ${file.name}</p>

            <p class="text-gray-500">Size: ${(file.size / 1024).toFixed(2)} KB</p>

            <button id="removeBtn" class="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded shadow">Remove Image</button>
          </div>
        `;

		document.getElementById("removeBtn").addEventListener("click", () => {
			resetPreview();
		});
	};
	reader.readAsDataURL(file);
}

function showError(msg) {
	previewContainer.innerHTML = `<p class="text-red-500 font-semibold">${msg}</p>`;
}

function resetPreview() {
	previewContainer.innerHTML = `<p class="text-gray-400">No image selected</p>`;
	fileInput.value = "";
}
