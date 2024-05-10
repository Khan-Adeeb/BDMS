
const data5=document.getElementById('form5');
data5.addEventListener('submit', fetching5);

    function fetching5(e) {
      e.preventDefault();
      const info1 = document.getElementById('state_dp').value;
      const info2 = document.getElementById('blood_dp').value;
      const info3 = document.getElementById('inputZip5').value;

      console.log(info1, info2, info3);

      async function fetchdata() {
        const url = 'http://localhost:3000/donatepatient'
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            state: info1,
            blood: info2,
            zip: info3,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });

        const output= document.getElementById('empty');
        const responseData = await response.json();
        let html = "";
        if ( responseData.message === "success") {
          responseData.Response.forEach(({first_name, last_name, phone, age, blood}) => {
            html += `
                <div class="col">
                    <div class="card h-100" style="max-width: 800px;">
                        <div class="row g-0">
                            <div class="col-md-4 ps-3 d-flex justify-content-center align-items-center">
                                <img src="/Sample_User_Icon.png" class="img-fluid cardimg" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Blood Group : ${blood} </h5>
                                    <p class="card-text">Name : ${first_name} ${last_name} <br>
                                        Contact : ${phone} <br>
                                        Age : ${age} <br>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
          });
          output.innerHTML = html;
        } else {
          html = `
              <div class="alert alert-info" role="alert">
                ${responseData.Response ? responseData.Response : responseData.message}
              </div>
          `;
          output.innerHTML = html;
        }


      }
      fetchdata();
    }
