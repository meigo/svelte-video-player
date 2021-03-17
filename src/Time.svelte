<script>
  import throttle from './libs/throttle.js';

  export let duration;
  export let currentTime;

  let ft = 0;

  $: hours = duration >= 3600;

  $: {
    if (currentTime) setTime();
  }

  const setTime = throttle(
    () => {
      ft = formatTime(currentTime, hours);
    },
    250,
    true
  );

  const formatTime = (seconds = 0, hours = false) => {
    let s = new Date(seconds * 1000).toISOString().substr(11, 8);
    return hours ? s : s.substring(3);
  };
</script>

<style>
  .time {
    position: relative;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 5px;
  }
  .text {
    position: relative;
    font-size: 1rem;
    line-height: 1rem;
    letter-spacing: 0.02rem;
    color: white;
  }
</style>

<div class="time">
  <div class="text">{ft}</div>
</div>
