import Toast from 'react-native-toast-message'

const ShowToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "top",
    });
  };

export default ShowToast
