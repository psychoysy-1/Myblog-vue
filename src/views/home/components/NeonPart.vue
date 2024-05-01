<script setup></script>

<template>
  <div class="neonLight">
    <h3>welcome to myBlog</h3>
  </div>
</template>

<style scoped>
.neonLight {
  position: relative;
  background-color: rgb(4, 15, 36);
  width: 47vw;
  height: 49vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes san {
  0%,
  10% {
    color: rgb(4, 15, 36);
    filter: blur(2px);
  }
  15% {
    color: rgb(255, 255, 255);
    text-shadow:
      0 0 5px rgb(22, 138, 216),
      0 0 25px rgb(22, 138, 216),
      0 0 35px rgb(22, 138, 216),
      0 0 105px rgb(22, 138, 216),
      0 0 155px rgb(22, 138, 216);
    filter: blur(0px);
  }
  30%,
  40% {
    color: rgb(255, 255, 255);
    text-shadow:
      0 0 5px rgb(22, 138, 216),
      0 0 25px rgb(22, 138, 216),
      0 0 35px rgb(22, 138, 216),
      0 0 105px rgb(22, 138, 216),
      0 0 155px rgb(22, 138, 216);
    filter: blur(0px);
  }
  45%,
  55% {
    color: rgb(4, 15, 36);
    filter: blur(2px);
  }
  60% {
    color: rgb(255, 255, 255);
    text-shadow:
      0 0 5px rgb(22, 138, 216),
      0 0 25px rgb(22, 138, 216),
      0 0 35px rgb(22, 138, 216),
      0 0 105px rgb(22, 138, 216),
      0 0 155px rgb(22, 138, 216);
    filter: blur(0px);
  }
  70%,
  90% {
    color: rgb(255, 255, 255);
    text-shadow:
      0 0 5px rgb(22, 138, 216),
      0 0 25px rgb(22, 138, 216),
      0 0 35px rgb(22, 138, 216),
      0 0 105px rgb(22, 138, 216),
      0 0 155px rgb(22, 138, 216);
    filter: blur(0px);
  }
  95%,
  100% {
    color: rgb(4, 15, 36);
    filter: blur(2px);
  }
}
h3 {
  font-size: 2.8em;
  text-transform: uppercase;
  letter-spacing: 10px;
  color: rgb(4, 15, 36);
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgb(218, 218, 218));
  animation: san 8s linear infinite;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
