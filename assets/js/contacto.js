const form = document.getElementById('form')
form.addEventListener("submit", (e) => {
    e.preventDefault()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    form.reset()
} );
