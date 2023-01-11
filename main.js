import {
  saveStudent,
  getStudents,
  onGetStudent,
  deleteStudent,
  getStudent,
  updateStudent,
} from './firebase.js';
const studentTable = document.querySelector('.students-table-body');

const openModal = document.getElementById('openRegisterModal');
const modal = document.getElementById('modal-update');
const closeModal = document.getElementById('closeRegisterModal');
const registerForm = document.getElementById('register-form');

let editStatus = true;
let id = '';

const showRegisterModal = () => {
  modal.classList.toggle('is-active');
};

openModal.addEventListener('click', showRegisterModal);
closeModal.addEventListener('click', showRegisterModal);

window.addEventListener('DOMContentLoaded', async () => {
  onGetStudent((querySnapshot) => {
    let html = '';

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
      btn.addEventListener('click', async (e) => {
        // console.log(e.target.dataset.id);
        const doc = await getStudent(e.target.dataset.id);
        // console.log(doc.data());
        const student = doc.data();
        showRegisterModal();
        registerForm['student-nombre'].value = student.nombre;
        registerForm['student-apepat'].value = student.apellidoPaterno;
        registerForm['student-apemat'].value = student.apellidoMaterno;
        registerForm['student-cel'].value = student.telefono;
        registerForm['student-email'].value = student.correoElectronico;
        registerForm['student-description'].value = student.descripcion;

        editStatus = true;
        id = doc.id;


      });
    });
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

  if (!editStatus) {
    saveStudent(
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      correoElectronico,
      descripcion
    );
  } else {
    updateStudent(id, {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      correoElectronico,
      descripcion,
    });

    editStatus = false;
  }

  registerForm.reset();
  modal.classList.remove('is-active');
});
