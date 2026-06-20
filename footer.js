
let Footer = document.getElementById('footer')
let Classname = document.getElementById('fx-sub');
let Classname2 = document.getElementById("fx-sub-label fx-top-item")
let Classname3 = document.getElementById("fx-logos")


Footer.innerHTML = `<div class="${Classname}">
      <div class="${Classname2}">Subsidiary of</div>
      <div class="fx-logos">
        <div class="fx-logo-item">
          <img loading="lazy" decoding="async" src="./src/assets/images/sunxholding.webp" alt="SUNX Holdings"
            style="max-height: 68px !important; max-width: 219px !important;" />
        </div>
        <div class="fx-logo-item">
          <img loading="lazy" decoding="async" src="./src/assets/images/sunxtech.webp" alt="Suntech Civil Services"
            style="max-height: 68px !important; max-width: 219px !important;" />
        </div>
        <div class="fx-logo-item">
          <img loading="lazy" decoding="async" src="./src/assets/images/sun-x.webp" alt="SUN-X" width="104"
            height="46" />
        </div>
        <div class="fx-logo-item">
          <img loading="lazy" decoding="async" src="./src/assets/images/alturus.webp" alt="Alturas Infrastructure"
            style="max-height: 68px !important; max-width: 219px !important;" />
        </div>
      </div>
    </div>`



let Footer2 = document.getElementById('footer2')

Footer2.innerHTML = `<div class="fx2-grid">

      <div class="fx2-col">
        <p class="fx2-col-title">Head Office</p>
        <div class="fx2-info-item">
          <svg class="fx2-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <ul class="fx2-links">
            <li><a href="https://maps.app.goo.gl/Lc2wkWbB8LF5WUsU6" target="_blank">No 11,
                Ramaniyam Isha, Old Mahabalipuram Road, Okkiyam Thoraipakkam, Chennai –
                600097</a></li>
          </ul>
        </div>
        <div class="fx2-info-item">
          <svg class="fx2-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <div>
            <ul class="fx2-links">
              <li><a href="tel:+919940400050">+91 99404 00050</a></li>

              <li><a href="tel:+918807147050">+91 88071 47050</a></li>
            </ul>
          </div>
        </div>
        <div class="fx2-info-item">
          <svg class="fx2-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <!-- <span class="fx2-info-text"><a href="mailto:info@sunxconcrete.org">info@sunxconcrete.org</a></span> -->
          <ul class="fx2-links">
            <li><a href="mailto:info@sunxconcrete.org">info@sunxconcrete.org</a></li>
          </ul>
        </div>
      </div>

      <div class="fx2-col">
        <p class="fx2-col-title">Quick Links</p>
        <ul class="fx2-links">
          <li><a href="our-products.html">Our Products</a></li>
          <li><a href="our-projects.html">Our Projects</a></li>
          <li><a href="our-plants.html">Our Plants</a></li>
        </ul>
      </div>

      <div class="fx2-col">
        <p class="fx2-col-title">About Us</p>
        <ul class="fx2-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Our Services</a></li>
          <li><a href="team.html">Our Team</a></li>
          <li><a href="careers.html">Careers</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>

      <div class="fx2-col">
        <p class="fx2-col-title">Resources &amp; Insights</p>
        <ul class="fx2-links">
          <li><a href="careers.html">Logistics Supervisor</a></li>
          <li><a href="careers.html">Accounts Executive</a></li>
          <li><a href="our-projects.html">Footing Foundation – Velacherry Project</a></li>
          <li><a href="our-projects.html">Bangalore Development Authority Project</a></li>
        </ul>
      </div>
    </div>

    <div class="fx2-bottom">
      <span class="fx2-bottom-right">All Rights Reserved © 2026 | Sun-X Concrete Pvt Ltd.</span>
    </div>
`

console.log(Footer);

console.log(Footer2);