import { upload, fileInput } from '../selector';

export function closeAddFile() {
  upload.classList.remove('active');
}

export function openAddFile() {
  upload.classList.add('active');
}

export function addFileHandler(event, handler) {
  fileInput.addEventListener(event, handler);
}

// Close when user clicks outside
upload.addEventListener('click', (e) => {
  if (!e.target.closest('.add-file-content')) closeAddFile();
});
