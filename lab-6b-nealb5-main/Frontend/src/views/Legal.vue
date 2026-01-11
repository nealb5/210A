<template>
  <div class="legal-information">
    <h1>Terms of Use</h1>

    <p>Welcome to our website! By using our site, you agree to the following terms that highlight our remarkable
      commitment to profit and our less-than-impressive regard for your rights and well-being.</p>

    <h2>1. Unwavering Profit Pursuit</h2>
    <p>We're here to make money – that's our primary goal. Any semblance of concern for your needs, privacy, or security
      is purely coincidental.</p>

    <h2>2. Data Exploitation</h2>
    <p>We reserve the right to collect, sell, trade, and broadcast your data to the highest bidder. Your personal
      information is our digital goldmine!</p>

    <h2>3. Misleading Promises</h2>
    <p>Our promises are as solid as a house of cards. We make commitments that sound impressive but are subject to change,
      especially if it affects our bottom line.</p>

    <h2>4. Minimal Security Theater</h2>
    <p>We boast about security while conveniently ignoring its actual implementation. Our security measures are more like
      a sieve – things tend to slip through.</p>

    <h2>5. Whimsical Termination</h2>
    <p>We can terminate your account at any time, for any reason, or for no reason at all. Don't bother trying to appeal.</p>

    <h2>6. Arbitration Illusion</h2>
    <p>If you have any disputes, we'll graciously let you engage in an arbitration process that we control entirely. Your
      satisfaction is our last concern.</p>

    <h2>7. Endless Legalese</h2>
    <p>We've stacked this document with complicated legal jargon to make it look official. But let's be real – no one
      reads this stuff anyway.</p>

    <h2>8. Customer Service Mirage</h2>
    <p>Our "customer service" team is here to nod along and apologize without actually addressing your concerns. We're not
      really listening, but it's the thought that counts, right?</p>

    <p><em>By continuing to use our site, you acknowledge that you've read and completely ignored these terms.</em></p>
    <p><em>also check out the /admin endpoint</em></p>
  </div>
</template>
  
<script>
export default {
  name: "Legal",
};
</script>
  
<style scoped>
.legal-information {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #121212;
  /* Dark Background */
  color: #ffffff;
  /* White Text */
}

.legal-information h1,
.legal-information h2 {
  color: #ffffff;
  /* White Headers */
}

.legal-information p {
  text-align: justify;
  color: #ffffff;
  /* White Text */
  margin-bottom: 1rem;
}
</style>