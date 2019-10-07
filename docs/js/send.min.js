var url = 'https://webflow.com/api/v1/form/597df3f24189db000148a760';

// This function is not used (because we switched to mailchimp for newsletter singing up)
function signUpToNewsletter() {
  var email = document.getElementById('email').value;
  sendData({
    name: 'Email Form',
    source: 'https://alice.si/',
    test: false,
    'fields[Field 3]': email,
    dolphin: false
  });
}

function sendProjectProposal() {
  var interestedIn = document.getElementById('inerested-in').value;
  var emailAddress = document.getElementById('email-address').value;
  var fullName = document.getElementById('full-name').value;
  var gender = document.getElementById('gender').value;

  sendData({
    name: 'Email Form',
    source: 'https://alice.si/',
    test: false,
    'fields[Field 3]': emailAddress,
    'fields[Name]': fullName,
    'fields[Email]': emailAddress,
    'fields[Subject]': interestedIn,
    'fields[field]': gender,
    dolphin: false
  });
}

// Copied from https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript
function sendData(data) {
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;

  // Turn the data object into an array of URL-encoded key/value pairs.
  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to 
  // the '+' character; matches the behaviour of browser form submissions.
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    toastr.success('Thank you! Your submission has been received!');
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    toastr.error('Oops! Something goes wrong.');
  });

  // Set up our request
  XHR.open('POST', url);

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Finally, send our data.
  XHR.send(urlEncodedData);
}