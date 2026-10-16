// script.js — small interactions for demo dashboard

// Sidebar toggle for mobile
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
menuToggle.addEventListener('click', ()=>{
  sidebar.classList.toggle('open');
});

// Simple counter animation for stat cards
const counters = document.querySelectorAll('.card-value');
counters.forEach(el=>{
  const target = +el.getAttribute('data-target')||0;
  let current = 0;
  const step = Math.ceil(target/60);
  const id = setInterval(()=>{
    current += step;
    if(current>=target){
      el.textContent = target + (el.getAttribute('data-target')==="92"?"%":"");
      clearInterval(id);
    } else {
      el.textContent = current;
    }
  },16);
});
