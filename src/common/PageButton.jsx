import { useNavigate } from 'react-router-dom';

function PageButton({buttonText, page}) {
    const navigate = useNavigate();

    return (
        <button onClick={() => {navigate(page);}}>
          {buttonText}
        </button>
      );
}

export default PageButton