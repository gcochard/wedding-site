{% extends 'layout.html' %}
{% block title %}{% parent %}{% endblock %}
{% block head %}
  {% parent %}
{% endblock %}
{% block content %}
    <div class="span12">
      <form name="rsvp" id="rsvpform">
        <div class="control-group">
          <label aria-hidden="true" for="firstname">First Name <span class="required-asterisk">*</span>
          </label>
          <div class="controls">
            <input class="text-josefin-sans" name="First Name" type="text" id="firstname" aria-label="First Name" aria-required="true" required>
          </div>
          <div class="error-message"></div>
          <div class="required-message">This is a required question</div>
        </div>
        <div class="control-group">
            <label aria-hidden="true" for="lastname" class="control-label">Last Name <span class="required-asterisk">*</span>
            </label>
          <div class="controls">
             <input class="text-josefin-sans" name="Last Name" type="text" id="lastname" aria-label="Last Name" aria-required="true" required>
          </div>
          <div class="error-message"></div>
          <div class="required-message">This is a required question</div>
        </div>
        <div class="control-group">
          <label aria-hidden="true" for="attending">Are you attending on April 26th? <span class="required-asterisk">*</span>
          </label>
          <ul class="ss-choices" aria-label="Are you attending on April 26th?">
            <li class="ss-choice-item">
              <label>
                <span class="ss-choice-item-control inline-block">
                  <input type="radio" id="attending" name="attending" value="Accept with pleasure" role="radio" class="ss-q-radio required" aria-checked="false" aria-label="Accept with pleasure" required>
                </span>
                <span class="muted ss-choice-label">Accept with pleasure</span>
              </label>
            </li>
            <li class="ss-choice-item">
              <label>
                <span class="ss-choice-item-control inline-block">
                  <input type="radio" name="attending" value="Decline with regret" style="margin-left:-0.9em;" role="radio" class="ss-q-radio required" aria-checked="false" aria-label="Decline with regret" required>
                </span>
                <span class="muted ss-choice-label">Decline with regret</span>
              </label>
            </li>
          </ul>
          <div class="error-message"></div>
          <div class="required-message">This is a required question</div>
        </div>
        <div id="yesoption" class="hidden">
          <div class="control-group" id="mealgroup">
            <label aria-hidden="true" for="meal">Your Meal Choice <span class="required-asterisk">*</span>
            </label>
            <ul class="ss-choices" aria-label="Your Meal Choice">
              <li class="ss-choice-item">
                <label>
                  <span class="ss-choice-item-control inline-block">
                    <input type="radio" id="meal" name="meal" value="Prime Rib" style="margin-left:-0.9em;" role="radio" class="ss-q-radio required" aria-checked="false" aria-label="Prime Rib" required>
                  </span>
                  <span class="muted ss-choice-label" id="primerib">Prime Rib</span>
                </label>
              </li>
              <li class="ss-choice-item">
                <label>
                  <span class="ss-choice-item-control inline-block">
                    <input type="radio" name="meal" value="Chicken" style="margin-left:-1.5em;" role="radio" class="ss-q-radio required" aria-checked="false" aria-label="Chicken" required>
                  </span>
                  <span class="muted ss-choice-label" id="chicken">Chicken</span>
                </label>
              </li>
              <li class="ss-choice-item">
                <label>
                  <span class="ss-choice-item-control inline-block">
                    <input type="radio" name="meal" value="Vegetarian" role="radio" class="ss-q-radio required" aria-checked="false" aria-label="Vegetarian" required>
                  </span>
                  <span class="muted ss-choice-label">Vegetarian</span>
                </label>
              </li>
            </ul>
            <div class="error-message"></div>
            <div class="required-message">This is a required question</div>
          </div>
          <div class="control-group">
            <label aria-hidden="true" for="songchoice"> Tell us a song that will get you dancing:
            </label>
            <div class="controls">
              <input class="text-josefin-sans" name="songchoice" id="songchoice" aria-label="Tell us a song that will get you dancing" placeholder="Song Title - Artist Name">
            </div>
          </div>
          <div class="control-group">
            <label aria-hidden="true" for="notes"> Do you have any special requests/allergies?
            </label>
            <div class="controls">
              <textarea class="text-josefin-sans ss-q-long" rows="8" cols="50" aria-label="Do you have any special requests/allergies?" name="notes" id="notes"></textarea>
            </div>
          </div>
        </div>
        <div id="nooption" class="hidden">
          <div class="control-group">
            <label aria-hidden="true" for="wellwishes"> Do you have any well wishes for the happy couple?
            </label>
            <div class="controls">
              <textarea class="text-josefin-sans ss-q-long" rows="8" cols="50" aria-label="Do you have any well wishes for the happy couple?" name="wellwishes" id="wellwishes"></textarea>
            </div>
          </div>
        </div>
        <div class="hidden" id="submit">
          <input type="submit" name="submit" value="Submit" class="text-josefin-sans">
        </div>
      </form>
      <div class="hidden" id="thanks">
        <span class="thanksmsg">Your RSVP was successful. We&apos;ll see you on the big day!</span><br>
        <a href="#another" class="anothermsg">RSVP another guest</a>
      </div>
      <script type="text/javascript">
        document.getElementById('rsvpform').style.display = 'none';
      </script>
      <hr>
      If you have any questions, please feel free to <a href="/contact">drop us a note</a>.
      <hr>
      <!--[if !IE]> -->
      <iframe style="width:100%;height:500px;overflow:hidden;border:none;margin:none;display:none;" id="mapframe" src="//maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Five%2BCrowns%2B3801%2BEast%2BCoast%2BHwy%2C%2BCorona%2Bdel%2BMar%2C%2BCA%2B92625&amp;ie=UTF8&amp;z=12&amp;t=m&amp;iwloc=addr&amp;output=embed"></iframe>
      <!-- <![endif]-->
      <!--[if IE]>
      <iframe style="width:100%;height:500px;border:none;margin:none;display:none;" id="mapframe" scrolling="no" src="//maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Five%2BCrowns%2B3801%2BEast%2BCoast%2BHwy%2C%2BCorona%2Bdel%2BMar%2C%2BCA%2B92625&amp;ie=UTF8&amp;z=12&amp;t=m&amp;iwloc=addr&amp;output=embed"></iframe>
      <![endif]-->
      <noscript>
        <a href="//maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Five%2BCrowns%2B3801%2BEast%2BCoast%2BHwy%2C%2BCorona%2Bdel%2BMar%2C%2BCA%2B92625&amp;ie=UTF8&amp;z=12&amp;t=m&amp;iwloc=addr" target="_blank"><img src="/images/map.png" alt="Map"></a>
      </noscript><br>
      <small style="display:none;" id="smalltext"><a href="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Five%2BCrowns%2B3801%2BEast%2BCoast%2BHwy%2C%2BCorona%2Bdel%2BMar%2C%2BCA%2B92625&amp;ie=UTF8&amp;z=12&amp;t=m&amp;iwloc=addr" target="_blank">View Larger Map</a></small>
    </div>

    <div class="alert alert-success {{thanksdiv}}">{{thanks}}</div>
    <div class="alert alert-error {{errordiv}}">{{error}}</div>

{% endblock %}
