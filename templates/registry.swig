<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{% block title %}StephanieAndGreg.us{% endblock %}</title>
    {% block head %}
    {% endblock %}
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/bootstrap-responsive.min.css">
    <link rel="stylesheet" href="/css/main.css">
    <script type="text/javascript">
      function showLoader(){
      var loadiv = document.getElementById('loading');
      loadiv.style.opacity = '0.95';
      loadiv.style.display = 'block';
    }
    </script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-48068603-1', 'stephanieandgreg.us');
      ga('send', 'pageview');
    </script>
  </head>
  <body>
    <div id="loading" style="z-index:9999;opacity:0.95;width:100%;height:100%;position:absolute;top:0;left:0;background-color:#6FC7B9;display:none;"></div>
    <script type="text/javascript">
      //showLoader();
    </script>
    <div class="container">
      <div class="masthead">
      </div>
      <div class="hero-unit jumbotron text-center font-hidden"><a href="/"><h1>we're getting married</h1></a>
        <h2>Stephanie &amp; Greg</h2><img alt="dots" src="/images/dots.png"><br>
        <h3>How many spoons do two people need, anyways?</h3>
        <h4 class="muted">all we really need is each other...</h4>
        <div class="row-fluid text-center">
          <div class="row-fluid text-center">
            <div class="span2">
              <a class="muted" href="/rsvp"><img alt="RSVP" src="/images/save-the-date.png"><br>RSVP</a><br><br>
              <a class="muted" href="/registry"><img alt="Make a Gift" src="/images/gift-reg.png"><br>Make a Gift</a>
            </div>
            <div class="span8">
              <div class="row-fluid">
                <div class="span6 offset3">
                  <div class="row-fluid">
                    <div class="span12">
                      <div class="row-fluid">
                        <div class="span12">
                          <span class="muted{% if !thanksdiv or !errordiv %} hidden{% endif %}">in lieu of traditional wedding gifts, we ask that you help us celebrate by making a gift to our &quot;Honeyfund.&quot;</span>
                          <address>
                            <span class="muted">Mail to:</span><br><br>
                            Stephanie &amp; Greg<br>
                            319 Avenida Cabrillo Apt C<br>
                            San Clemente, CA 92672
                          </address>
                        </div>
                      </div>
                      <hr>
                      <div class="row-fluid">
                        <div class="span12">
                          <div class="row-fluid">
                            <div class="span12">
                              <div id="thanks" style="padding-bottom:1em;" class="alert alert-success {{thanksdiv}}">{{thanks|raw}}</div>
                              <div id="error" style="padding-bottom:1em;" class="alert alert-error {{errordiv}}">{{error|raw}}</div>
                            </div>
                          </div>
                          <div class="input-prepend input-append">
                            <span class="add-on">$</span>
                            <input type="text" name="amount" id="amount" placeholder="100" size="4" style="width:4em;" />
                            &nbsp;
                            <button class="btn" type="button" id="paybutton">Make a gift online</button>
                            <script>
                              document.getElementById('paybutton').disabled = true;
                            </script>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="row-fluid">
                <div class="span6 offset3">
                  B.Y.O.T.<br>
                  (bring your own toy)<br>
                  <p class="muted">
                    If you would like to bring a gift we ask that you bring a new, 
                    unwrapped toy to donate to the <a href="http://www.choc.org/">Children&apos;s Hospital of Orange County</a>.
                    CHOC relies on toy donations to lift the spirits of children with life-threatening illnesses.
                  </p>
                  <span class="muted">Thank you for your generosity!</span>
                </div>
              </div>
              <hr>
              <div class="row-fluid">
                <div class="span12">If you have any questions, please feel free to <a href="/contact">drop us a note</a>.</div>
              </div>
              <div class="row-fluid">
                <div class="span8 offset2"><img alt="footer" src="/images/footer-image.png"></div>
                <div class="span2"></div>
              </div>
              <br><br>
              <div class="muted text-center">A Future Mr. &amp; Mrs. Cochard Creation &copy; 2013 all rights reserved</div>
            </div>
            <div class="span2">
              <a class="muted" href="/photos"><img alt="Engagement Photos" src="/images/photos.png"><br>Engagement Photos</a><br><br>
              <a class="muted" href="/contact"><img alt="Contact Us" src="/images/letters.png"><br>Drop us a love note</a>
            </div>
          </div>
        </div>
      </div>
    <div class="coinbase-button" data-code="132021c44bfebd77e2c12592ea9632e5" data-button-style="none" data-custom="donate_btn_1"></div>
    <script data-main="/js/app.js" src="/components/requirejs/require.js"></script>
  </div>
  </body>
</html>
