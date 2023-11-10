const ANATOURIZED = 403;
const NOT_FOUND = 404;

const handleApiError = (error, setError, navigate) => {
  if (error.response) {
    setError(error.response.data.message);
    if (error.response.status === ANATOURIZED) {
      localStorage.clear();
      navigate('/');
    }
    if (error.response.status === NOT_FOUND) {
      // navigate('/404');
    }
  } else {
    setError('Ocorreu um erro inesperado ao se comunicar com o servidor.');
  }
};

export default handleApiError;
