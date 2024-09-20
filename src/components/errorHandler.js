// src/errorHandler.js
export const handleError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    let errorMessage = 'Something went wrong. Please try again later.';
  
    switch (context) {
      case 'retrieve':
        errorMessage = 'Cannot load details. Something went wrong.';
        break;
      case 'add':
        errorMessage = 'Failed to add new order. Please try again.';
        break;
      case 'update':
        errorMessage = 'Failed to update order. Please try again.';
        break;
      case 'delete':
        errorMessage = 'Failed to delete order. Please try again.';
        break;
      case 'network':
        errorMessage = 'Network error. Please check your connection.';
        break;
      case 'server':
        errorMessage = 'Server error. Please try again later.';
        break;
      case 'invalid-url':
        errorMessage = 'Invalid URL. Please check the endpoint.';
        break;
      default:
        break;
    }
  
    alert(errorMessage);
  };
  