<script lang="ts">
  import VideoPlayer from 'svelte-video-player';
  // import VideoPlayer from '../../src/VideoPlayer.svelte';

  const poster: string =
    'https://res.cloudinary.com/dvm02rtnk/image/upload/c_scale,w_1024,q_auto/v1628058523/blender/HERO_Blender_Grease_Pencil_Showcase_g86hfo.jpg';
  const source: string[] = [
    'https://res.cloudinary.com/dvm02rtnk/video/upload/v1628057414/blender/HERO_Blender_Grease_Pencil_Showcase_1080p_ctsjpy.mp4',
    'https://res.cloudinary.com/dvm02rtnk/video/upload/v1628057414/blender/HERO_Blender_Grease_Pencil_Showcase_1080p_ctsjpy.webm',
    'https://res.cloudinary.com/dvm02rtnk/video/upload/v1628057414/blender/HERO_Blender_Grease_Pencil_Showcase_1080p_ctsjpy.ogv',
  ];

  const poster2: string =
    'https://res.cloudinary.com/dvm02rtnk/image/upload/c_scale,w_1024,q_auto:good/v1628058523/blender/Agent_327__Operation_Barbershop_dbyrdi.jpg';
  const source2: string =
    'https://res.cloudinary.com/dvm02rtnk/video/upload/v1628057411/blender/Agent_327_Operation_Barbershop_1080p_hf1iq7.mp4';

  const poster_kaka: string = './kaka_walk.jpg';
  const source_kaka: string[] = ['./kaka_walk.mp4'];

  let controlsHeight: number = 60;
  let trackHeight: number = 6;
  let thumbSize: number = 15;
  let centerIconSize: number = 60;
  let color: string = '#FF3E00';
  let bufferedColor: string = '#FF9600';
  let playerBgColor: string = '#EEEEEE';
  let barsBgColor: string = '#FFFFFF';
  let focusColor: string = '#FFFFFF';
  let iconColor: string = '#FFFFFF';
  let chunkBars: boolean = false;
  let loop: boolean = false;
  let borderRadius: number = 8;
  let skipSeconds: number = 10;
  let controlsOnPause: boolean = true;
  let timeDisplay: boolean = true;
</script>

<style>
  :global(body) {
    background-color: #ffffff;
  }

  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 10px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 100;
    text-align: center;
    line-height: 90%;
    padding-top: 0.2rem;
    padding-bottom: 1rem;
  }

  p {
    padding: 1.5rem 0;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: none;
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .config-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 10px;
    justify-items: center;
  }

  .config {
    position: relative;
    font-size: 75%;
    background-color: rgb(245, 245, 245);
    padding-top: 1rem;
    border-radius: 5px;
  }

  .config label {
    display: block;
    min-height: 35px;
    width: 9rem;
  }

  .config label input {
    float: right;
  }

  input[type='range'],
  input[type='color'] {
    width: 50px;
  }

  input[type='checkbox'] {
    -ms-transform: scale(1.1); /* IE */
    -moz-transform: scale(1.1); /* FF */
    -webkit-transform: scale(1.1); /* Safari and Chrome */
    -o-transform: scale(1.1); /* Opera */
    transform: scale(1.1);
  }

  .config-video-player-grid {
    display: block;
  }

  .video-player-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px 0px;
    margin-bottom: 1rem;
  }

  .video-player-inline {
    display: block;
    margin: 1rem 0;
  }

  @media (min-width: 640px) {
    .config-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      gap: 0px 10px;
      justify-items: center;
    }

    .video-player-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      gap: 0px 10px;
    }

    .video-player-inline {
      display: inline;
      float: left;
      width: 350px;
      margin: 1rem 1rem 1rem 0;
    }
  }
</style>

<main>
  <img class="center" src="./svp_animated.svg" height="50" alt="SVP logo" />
  <h1>DEMO</h1>

  <div style="min-height:20px; margin-bottom:10px;">
    <a href="https://npmjs.org/package/svelte-video-player">
      <img
        class="center"
        height="20"
        src="https://img.shields.io/npm/v/svelte-video-player?style=flat-square"
        alt="version" />
    </a>
  </div>

  <p>
    I will here give a brief sketch of the progress of opinion on the Origin of Species. Until recently the great
    majority of naturalists believed that species were immutable productions, and had been separately created. This view
    has been ably maintained by many authors. Some few naturalists, on the other hand, have believed that species
    undergo modification, and that the existing forms of life are the descendants by true generation of pre existing
    forms.
  </p>
  <VideoPlayer
    width="2048"
    height="858"
    {poster}
    {source}
    controlsHeight="{controlsHeight}px"
    thumbSize="{thumbSize}px"
    trackHeight="{trackHeight}px"
    centerIconSize="{centerIconSize}px"
    borderRadius="{borderRadius}px"
    {color}
    {playerBgColor}
    {barsBgColor}
    {iconColor}
    {focusColor}
    {bufferedColor}
    {chunkBars}
    {loop}
    {skipSeconds}
    {controlsOnPause}
    {timeDisplay} />
  <div class="config-video-player-grid">
    <div class="config config-grid">
      <label
        ><span>Controls Height</span>
        <input type="range" min="40" max="150" bind:value={controlsHeight} />
      </label>
      <label
        ><span>Thumb Size</span>
        <input type="range" min="4" max="50" bind:value={thumbSize} />
      </label>
      <label
        ><span>Track Height</span>
        <input type="range" min="4" max="20" bind:value={trackHeight} />
      </label>
      <label
        ><span>Border Radius</span>
        <input type="range" min="0" max="25" bind:value={borderRadius} />
      </label>
      <label
        ><span>Skip Seconds</span>
        <input type="range" min="1" max="20" bind:value={skipSeconds} />
      </label>
      <label
        ><span>Center Icon Size</span>
        <input type="range" min="40" max="200" bind:value={centerIconSize} />
      </label>
      <label><span>Chunk Bars</span><input type="checkbox" bind:checked={chunkBars} /></label>
      <label><span>Loop</span><input type="checkbox" bind:checked={loop} /></label>
      <label><span>Controls On Pause</span><input type="checkbox" bind:checked={controlsOnPause} /></label>
      <label><span>Time Display</span><input type="checkbox" bind:checked={timeDisplay} /></label>
      <label><span>Color</span><input type="color" bind:value={color} /></label>
      <label><span>Player Bg Color</span><input type="color" bind:value={playerBgColor} /></label>
      <label><span>Bars Bg Color</span><input type="color" bind:value={barsBgColor} /></label>
      <label><span>Icon Color</span><input type="color" bind:value={iconColor} /></label>
      <label><span>Focus Color</span><input type="color" bind:value={focusColor} /></label>
      <label><span>Buffered Color</span><input type="color" bind:value={bufferedColor} /></label>
    </div>
  </div>

  <p>
    Passing over allusions to the subject in the classical writers (Aristotle, in his "Physicae Auscultationes" (lib.2,
    cap.8, s.2), after remarking that rain does not fall in order to make the corn grow, any more than it falls to spoil
    the farmer's corn when threshed out of doors, applies the same argument to organisation; and adds (as translated by
    Mr. Clair Grece, who first pointed out the passage to me), "So what hinders the different parts (of the body) from
    having this merely accidental relation in nature? as the teeth, for example, grow by necessity, the front ones
    sharp, adapted for dividing, and the grinders flat, and serviceable for masticating the food; since they were not
    made for the sake of this, but it was the result of accident.
  </p>

  <VideoPlayer width="1920" height="804" poster={poster2} source={source2} {playerBgColor} chunkBars skipSeconds="3" />

  <p>
    And in like manner as to other parts in which there appears to exist an adaptation to an end. Wheresoever,
    therefore, all things together (that is all the parts of one whole) happened like as if they were made for the sake
    of something, these were preserved, having been appropriately constituted by an internal spontaneity; and whatsoever
    things were not thus constituted, perished and still perish." We here see the principle of natural selection
    shadowed forth, but how little Aristotle fully comprehended the principle, is shown by his remarks on the formation
    of the teeth.), the first author who in modern times has treated it in a scientific spirit was Buffon.
    <span class="video-player-inline">
      <VideoPlayer
        width="540"
        height={540}
        {playerBgColor}
        poster={poster_kaka}
        source={source_kaka}
        loop
        skipSeconds="2" />
    </span>
    But as his opinions fluctuated greatly at different periods, and as he does not enter on the causes or means of the transformation
    of species, I need not here enter on details. Lamarck was the first man whose conclusions on the subject excited much
    attention. This justly celebrated naturalist first published his views in 1801; he much enlarged them in 1809 in his
    "Philosophie Zoologique", and subsequently, 1815, in the Introduction to his "Hist. Nat. des Animaux sans Vertebres".
    In these works he up holds the doctrine that all species, including man, are descended from other species.He first did
    the eminent service of arousing attention to the probability of all change in the organic, as well as in the inorganic
    world, being the result of law, and not of miraculous interposition. Lamarck seems to have been chiefly led to his conclusion
    on the gradual change of species, by the difficulty of distinguishing species and varieties, by the almost perfect gradation
    of forms in certain groups, and by the analogy of domestic productions. With respect to the means of modification, he
    attributed something to the direct action of the physical conditions of life, something to the crossing of already existing
    forms, and much to use and disuse, that is, to the effects of habit. To this latter agency he seems to attribute all
    the beautiful adaptations in nature; such as the long neck of the giraffe for browsing on the branches of trees. But
    he likewise believed in a law of progressive development, and as all the forms of life thus tend to progress, in order
    to account for the existence at the present day of simple productions, he maintains that such forms are now spontaneously
    generated.
  </p>

  <div class="video-player-grid">
    <VideoPlayer
      width="1920"
      height="804"
      poster="https://res.cloudinary.com/dvm02rtnk/image/upload/c_scale,q_auto,w_1024/v1628058523/blender/Spring_-_Blender_Open_Movie_dah072.jpg"
      source="https://res.cloudinary.com/dvm02rtnk/video/upload/w_1024,q_auto/v1628057422/blender/Spring_Blender_Open_Movie_1080p_nmkckb.mp4"
      playerBgColor="black"
      skipSeconds="1.5" />
    <VideoPlayer
      width="1920"
      height="804"
      poster="https://res.cloudinary.com/dvm02rtnk/image/upload/c_scale,q_auto,w_1024/v1628058523/blender/Coffee_Run_-_Blender_Open_Movie_pkw8vs.jpg"
      source="https://res.cloudinary.com/dvm02rtnk/video/upload/w_1024,q_auto/v1628059304/blender/Coffee_Run_Blender_Open_Movie_1080p_bj9v97.mp4"
      skipSeconds={3}
      {playerBgColor} />
  </div>

  (I have taken the date of the first publication of Lamarck from Isidore Geoffroy Saint- Hilaire's ("Hist. Nat.
  Generale", tom. ii. page 405, 1859) excellent history of opinion on this subject. In this work a full account is given
  of Buffon's conclusions on the same subject. It is curious how largely my grandfather, Dr. Erasmus Darwin, anticipated
  the views and erroneous grounds of opinion of Lamarck in his "Zoonomia" (vol. i. pages 500-510), published in 1794.
  According to Isid. Geoffroy there is no doubt that Goethe was an extreme partisan of similar views, as shown in the
  introduction to a work written in 1794 and 1795, but not published till long afterward; he has pointedly remarked
  ("Goethe als Naturforscher", von Dr. Karl Meding, s. 34) that the future question for naturalists will be how, for
  instance, cattle got their horns and not for what they are used.
  <p />
</main>
