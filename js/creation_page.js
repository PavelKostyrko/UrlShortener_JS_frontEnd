var input1 = document.getElementById('longLink');
input1.value = "";
var input2 = document.getElementById('useShortLink');
input2.value = "";
var obj;

document.getElementById('goToMain').addEventListener('click', () => {
    window.location.href = 'main_page.html';
});

document.getElementById('doShortLink').addEventListener('click', async () => {

    var link = input1.value;

    if (link) {
        
        try {
            var result = await fetch(`https://localhost:7082/api/url/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ longUrl: link, shortUrl: "", created: "", clicksCount: 0 })
            });

            if (result.ok) {
                obj = await result.json();

                input2.value = obj.shortUrl;
                input1.value = "";
                return obj;
            }
            else alert(result.statusText);
        }
        catch (err) {
            console.error(err);
        }
    }
    else alert("Put the link, that you want to short.");
});

document.getElementById('useShortLink').addEventListener('click', async () => {

    if (input2.value != "") {
        
        if (confirm("Do you want to go to another site?") == true){
            try {
                var result = await fetch(`https://localhost:7082/api/url/${document.getElementById('useShortLink').value}`);
               
                if (result.ok) {
                    var redirectedUrl = await result.text();
                    window.location.href = `${redirectedUrl}`;
                }
                else alert(result.statusText);
            }

            catch (err) {
                console.error(err);
            }
        }
    }
    else alert("At first, create your shortlink.");
});

document.getElementById('changeShortLink').addEventListener('click', async () => {

    if (input2.value != "") {
        
        try {
            var result = await fetch(`https://localhost:7082/api/url/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: obj.id, longUrl: obj.longUrl, shortUrl: obj.shortUrl, created: obj.created, clicksCount: 0 })
            });

            if (result.ok) {
                obj = await result.json();
                input2.value = obj.shortUrl;
                return obj;
            }
            else alert(result.statusText);
        }
        catch (err) {
            console.error(err);

        }
    }
    else alert("You have not the shortlink for change");
});