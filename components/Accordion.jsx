// accordion for testing purpose
// will be modified for displaying categories later

import React from 'react'

function Accordion() {
  return (
<>
<section className="container-ac">

  <h1 className="ac-h1">CSS Accordions</h1>
  <h3 className="ac-h3">Because we can.</h3>
  
  <div className="ac">
    
    <input className="ac-input" id="ac-1" name="ac-1" type="checkbox" />
    <label className="ac-label" htmlFor="ac-1">Item 1</label>
    
    <article className="ac-text">
      
      <div className="ac-sub">
        <input className="ac-input" id="ac-2" name="ac-2" type="checkbox" />
        <label className="ac-label" htmlFor="ac-2">I love jelly donuts</label>
        <article className="ac-sub-text">
<p>But not only is the sea such a foe to man who is an alien to it, but it is also a fiend to its own off-spring; worse than the Persian host who murdered his own guests; sparing not the creatures which itself hath spawned. Like a savage tigress that tossing in the jungle overlays her own cubs, so the sea dashes even the mightiest whales against the rocks, and leaves them there side by side with the split wrecks of ships. No mercy, no power but its own controls it. Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.</p>

<p>Consider the subtleness of the sea; how its most dreaded creatures glide under water, unapparent for the most part, and treacherously hidden beneath the loveliest tints of azure. Consider also the devilish brilliance and beauty of many of its most remorseless tribes, as the dainty embellished shape of many species of sharks. Consider, once more, the universal cannibalism of the sea; all whose creatures prey upon each other, carrying on eternal war since the world began.</p>
        </article>
      </div>
      
      <div className="ac-sub">
        <input className="ac-input" id="ac-3" name="ac-3" type="checkbox" />
        <label className="ac-label" htmlFor="ac-3">They are so delicious</label>
        <article className="ac-sub-text">
          <p>My younger brother was in London when the Martians fell at Woking. He was a medical student working for an imminent examination, and he heard nothing of the arrival until Saturday morning.  The morning papers on Saturday contained, in addition to lengthy special articles on the planet Mars, on life in the planets, and so forth, a brief and vaguely worded telegram, all the more striking for its brevity.</p>

<p>The Martians, alarmed by the approach of a crowd, had killed a number of people with a quick-firing gun, so the story ran.  The telegram concluded with the words: "Formidable as they seem to be, the Martians have not moved from the pit into which they have fallen, and, indeed, seem incapable of doing so.  Probably this is due to the relative strength of the earth's gravitational energy."  On that last text their leader-writer expanded very comfortingly.</p>
        </article>
      </div>
      
    </article>{/*<!--/ac-text-->*/}
    
  </div>{/*<!--/ac-->*/}
  
  
  
  <div className="ac">
    
    <input className="ac-input" id="ac-4" name="ac-4" type="checkbox" />
    <label className="ac-label" htmlFor="ac-4">Item 2</label>
    
    <article className="ac-text">
      
      <div className="ac-sub">
        <input className="ac-input" id="ac-5" name="ac-5" type="checkbox" />
        <label className="ac-label" htmlFor="ac-5">I also love regular donuts</label>
        <article className="ac-sub-text">
<p>But not only is the sea such a foe to man who is an alien to it, but it is also a fiend to its own off-spring; worse than the Persian host who murdered his own guests; sparing not the creatures which itself hath spawned. Like a savage tigress that tossing in the jungle overlays her own cubs, so the sea dashes even the mightiest whales against the rocks, and leaves them there side by side with the split wrecks of ships. No mercy, no power but its own controls it. Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.</p>

<p>Consider the subtleness of the sea; how its most dreaded creatures glide under water, unapparent for the most part, and treacherously hidden beneath the loveliest tints of azure. Consider also the devilish brilliance and beauty of many of its most remorseless tribes, as the dainty embellished shape of many species of sharks. Consider, once more, the universal cannibalism of the sea; all whose creatures prey upon each other, carrying on eternal war since the world began.</p>
        </article>
      </div>
      
      <div className="ac-sub">
        <input className="ac-input" id="ac-6" name="ac-6" type="checkbox" />
        <label className="ac-label" htmlFor="ac-6">They are also delicious</label>
        <article className="ac-sub-text">
          <p>My younger brother was in London when the Martians fell at Woking. He was a medical student working for an imminent examination, and he heard nothing of the arrival until Saturday morning.  The morning papers on Saturday contained, in addition to lengthy special articles on the planet Mars, on life in the planets, and so forth, a brief and vaguely worded telegram, all the more striking for its brevity.</p>

<p>The Martians, alarmed by the approach of a crowd, had killed a number of people with a quick-firing gun, so the story ran.  The telegram concluded with the words: "Formidable as they seem to be, the Martians have not moved from the pit into which they have fallen, and, indeed, seem incapable of doing so.  Probably this is due to the relative strength of the earth's gravitational energy."  On that last text their leader-writer expanded very comfortingly.</p>
        </article>
      </div>
      
    </article>{/*<!--/ac-text-->*/}
    
  </div>{/*<!--/ac-->*/}
  
  
</section>
</>
  )
}

export default Accordion