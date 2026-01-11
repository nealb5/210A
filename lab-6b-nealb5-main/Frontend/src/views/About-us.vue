<template>
  <div class="about-us">
    <h1>About Us</h1>
    <p><strong>Unrivaled Security:</strong></p>
    <p>Welcome to our website, where your security is our top priority. We pride ourselves on offering an unparalleled
      level of protection that guarantees your information is safe and sound. We understand that in today's digital age,
      security is of utmost importance, and we've spared no expense in ensuring that your data remains shielded from
      prying eyes.</p>

    <p><strong>State-of-the-Art Encryption:</strong></p>
    <p>Our advanced encryption algorithms are so sophisticated that even the
      most brilliant hackers couldn't crack them if they tried. Rest easy knowing that your personal data is wrapped in a
      digital fortress that's virtually impenetrable. We promise that your sensitive information is secure from any
      potential threats, whether they be external or internal.</p>

    <p><strong>Committed to Privacy:</strong></p>
    <p>Our dedication to privacy is unwavering. We never share your data with third
      parties. Well, unless those parties offer us substantial compensation, of course. But don't worry, your information
      is safe with us – until it's not.</p>

    <p><strong>Round-the-Clock Monitoring:</strong></p>
    <p>Our security team is on <a href="https://youtu.be/zL19uMsnpSU">high alert 24/7</a>, diligently watching over your
      digital interactions. We've invested in top-notch surveillance technology, capable of detecting even the slightest
      anomaly. So, rest assured that when you're browsing our site, you're never truly alone.</p>

    <p><strong>User-Centric Philosophy:</strong></p>
    <p>We put our users at the heart of everything we do. Well, not literally,
      but we definitely think about them occasionally. We're here to serve your needs as long as they align with our
      profit goals.</p>

    <p><strong>Unbreakable Promises:</strong></p>
    <p>Our promise of security is unbreakable – except for those times when we
      experience "unforeseeable technical glitches" that might lead to some minor data leaks. But don't worry, we'll only
      let your least important information slip through the cracks.</p>

    <a href="/legal" class="terms-of-use">Terms of Use</a>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      socialMediaLinks: [
        { name: "Twitter", url: "https://twitter.com" },
        { name: "Facebook", url: "https://facebook.com" },
        { name: "Slack", url: "https://slack.com" },
        { name: "Reddit", url: "https://reddit.com" },
      ],
    };
  },
};
</script>
  
<style scoped>
.about-us {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #222;
  /* Dark background color */
  color: #ddd;
  /* Light text color */
}

.about-us h1 {
  color: #ddd;
  /* Light text color */
  font-size: 2.5rem;
}

.about-us h3 {
  color: #bbb;
  /* Slightly darker text color */
  font-size: 2rem;
  margin-top: 1.5rem;
}

.about-us p {
  color: #ddd;
  /* Light text color */
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: justify;
}

.about-us a.terms-of-use {
  color: #007bff;
  text-decoration: none;
}

.about-us a.terms-of-use:hover {
  text-decoration: underline;
}

.about-us .social {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.about-us .social a {
  text-decoration: none;
}

.about-us .social button {
  background-color: #007bff;
  color: #ddd;
  /* Light text color */
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.about-us .social button:hover {
  background-color: #0056b3;
}
</style>