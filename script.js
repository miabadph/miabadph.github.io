var datepicker = document.getElementById('datePicker');
var dpMainContainer = document.getElementById('dpContainer');
var mainContainer = document.getElementById('mainContainer');
var imageContainer = document.getElementById('content');
var imageElement = document.getElementById('nasaImg');
var modal = document.getElementById('imgModal');
var modalContent = document.getElementById('modalImgContent');
var closeBtn = document.getElementById('closeSpan');
datepicker.valueAsDate = new Date();
var CurrentImageHeight = 0;
var CurrentImageWidth = 0;
var apiRequest = new XMLHttpRequest();
var pageWidth = mainContainer.clientWidth;
dpMainContainer.style.left = (pageWidth / 2) - 200;
imageContainer.style.display = 'none';
closeBtn.style.display = 'none';
// Open a new connection, using the GET request on the URL endpoint
apiRequest.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=8tKXFJvk4bzxmNizdRyj62p8ouqTEIo4LCoJO7FP', true);

apiRequest.onload = function () {
  var data = JSON.parse(this.response);
  setImage(data.url);
}

apiRequest.send();

imageElement.onclick = function() {
    modal.style.height = CurrentImageHeight / 2;
    modal.style.width = CurrentImageWidth / 2;
    var calcPosition = (pageWidth / 2) - ((CurrentImageWidth / 4));
    // modalContent.style.height = CurrentImageHeight / 3;
    // modalContent.style.width = CurrentImageWidth / 3;
    modal.style.left = calcPosition;
    modalContent.src = this.src;
}

function setImage(imageUrl)
{
    setDimensions(imageUrl);
}

function submitDate() {
    // alert(datepicker.value);
    var requestUrl = 'https://api.nasa.gov/planetary/apod?date=' + datepicker.value + '&api_key=8tKXFJvk4bzxmNizdRyj62p8ouqTEIo4LCoJO7FP';
    apiRequest.open('GET', requestUrl, true);
    apiRequest.send();
}

function setDimensions(url){
    var image = new Image();
    image.onload = function(){
        // alert("width["+image.naturalWidth+"] Height["+image.naturalHeight+"]");
        CurrentImageHeight = image.naturalHeight;
        CurrentImageWidth = image.naturalWidth;
        imageContainer.style.width = (CurrentImageWidth / 4);
        imageContainer.style.height = (CurrentImageHeight / 4);
        // var calcStr = "calc(50% - " + (CurrentImageWidth / 8) + "px)";
        var calcPosition = (pageWidth / 2) - ((CurrentImageWidth / 8));
        imageContainer.style.left = calcPosition;
        imageElement.src = url;
    };
    image.src = url;
   
}

imageElement.onload = function() {
    imageContainer.style.display = 'block';
}

modalContent.onload = function() {
    modal.style.display = 'block';
    closeBtn.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

function onPageResize() {
    pageWidth = mainContainer.clientWidth;
    var calcPosition = (pageWidth / 2) - ((CurrentImageWidth / 8));
    imageContainer.style.left = calcPosition;
    dpMainContainer.style.left = (pageWidth / 2) - 200;
}