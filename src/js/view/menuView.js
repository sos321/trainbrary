import { menu } from '../selector';

export function openMenu() {
  if (menu.classList.contains('active')) return;

  menu.classList.add('active');
}

export function closeMenu() {
  if (!menu.classList.contains('active')) return;

  menu.classList.remove('active');
}
