import {
  saveStudent,
  getStudents,
  onGetStudent,
  deleteStudent,
  getStudent,
} from './firebase.js';
const studentTable = document.querySelector('.students-table-body');

const openModal = document.getElementById('openRegisterModal');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeRegisterModal');
const registerForm = document.getElementById('register-form');

const showRegisterModal = () => {
  modal.classList.toggle('is-active');
};

openModal.addEventListener('click', showRegisterModal);
closeModal.addEventListener('click', showRegisterModal);

window.addEventListener('DOMContentLoaded', async () => {
  onGetStudent((querySnapshot) => {
    let html = "";

    querySnapshot.forEach((doc) => {
      const studentData = doc.data();

      html += `<tr>
        <th>1</th>
        <td>${studentData.nombre}</td>
        <td>${studentData.apellidoPaterno}</td>
        <td>${studentData.apellidoMaterno}</td>
        <td>${studentData.telefono}</td>
        <td>${studentData.correoElectronico}</td>
        <td>
          <button class="button is-warning" data-id="${doc.id}">
            Editar <i class="fas fa-pencil-alt"></i>
          </button>
          <button class="button is-danger" data-id="${doc.id}">
            Eliminar <i class="fas fa-trash-alt"></i>
          </button>
        </tr>`;
    });

    studentTable.innerHTML = html;


    // with target destructuring 👇
    const btnsDelete = studentTable.querySelectorAll('.is-danger');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deleteStudent(dataset.id);
        console.log(dataset.id);
      });
    });

    // without target destructuring 👇
    const btnsEdit = studentTable.querySelectorAll('.is-warning');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async(e) => {
        console.log(e.target.dataset.id);
        const doc = await getStudent(e.target.dataset.id);
        console.log(doc.data());
      })
    })
  });
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = registerForm['nombre'].value;
  const apellidoPaterno = registerForm['apePat'].value;
  const apellidoMaterno = registerForm['apeMat'].value;
  const telefono = registerForm['cel'].value;
  const correoElectronico = registerForm['email'].value;
  const descripcion = registerForm['desc'].value;

  saveStudent(
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    telefono,
    correoElectronico,
    descripcion
  );

  registerForm.reset();
  modal.classList.remove('is-active');
});
