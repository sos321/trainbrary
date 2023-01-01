import { upload } from '../selector';

export function closeAddFile() {
  upload.classList.remove('active');
}

export function openAddFile() {
  upload.classList.add('active');
}

// Close when user clicks outside
upload.addEventListener('click', (e) => {
  if (!e.target.closest('.add-file-content')) closeAddFile();
});
