import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const topTost = () => {
    MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        backdrop:false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    }).fire({
        icon: 'success',
        title: 'Action Execute Successfully'
    });
}

export default topTost