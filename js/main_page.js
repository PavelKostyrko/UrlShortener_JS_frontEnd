window.addEventListener('DOMContentLoaded', getAllUrls);

async function getAllUrls(urls) {

    try {
        var result = await fetch('https://localhost:7082/api/url');

        if (result.ok) {
            var urls = await result.json();

            urls.forEach((el) => {
                let row = document.createElement('tr');
                row.innerHTML =
                    `<td><a href="${el.longUrl}">${el.longUrl}</a></td>
                <td class="redirectLink" id="short${el.id}" onclick="redirectUrls(${el.id})">${el.shortUrl}</td> 
                <td>${el.created}</td>
                <td>${el.clicksCount}</td>
                <td><button class="deleteButton" onclick="deleteUrls(${el.id})"> Delete the link </button></td>`;
                document.querySelector('.myTable').appendChild(row);
            });
        }
        else alert(result.statusText);
    }

    catch (err) {
        console.error(err);
    }

}

document.getElementById('goToShortener').addEventListener('click', () => {
    window.location.href = 'creation_page.html';
});

async function deleteUrls(id) {

    try {
        if (confirm("Do you want to delete the shortlink?") == true) {

            var result = await fetch(`https://localhost:7082/api/url/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (result.ok) {
                location.reload();
            }
            else alert(result.statusText);
        }

        return;
    }

    catch (err) {
        console.error(err);
    }
}

async function redirectUrls(id) {

    try {
        if (confirm("Do you want to go to another site?") == true) {
            var result = await fetch(`https://localhost:7082/api/url/${document.getElementById(`short${id}`).innerHTML}`);
            
            if (result.ok) {
                var redirectedUrl = await result.text();

                setTimeout(() => {
                    location.reload();
                }, 700);

                window.location.href = `${redirectedUrl}`;
            }
            else alert(result.statusText);
        }

        return;
    }

    catch (err) {
        console.error(err);
    }
}