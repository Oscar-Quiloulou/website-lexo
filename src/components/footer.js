// /src/components/footer.js

const footer = document.getElementById("footer");

footer.innerHTML = `
  <footer class="footer">
    <p>© ${new Date().getFullYear()} EduGame — Site éducatif & IA</p>
    <p>
      <a href="/src/pages/account/vip.html">VIP & pubs</a> •
      <a href="/src/pages/ads/boost.html">Boost pub</a>
    </p>
  </footer>
`;
