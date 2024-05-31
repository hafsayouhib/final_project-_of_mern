// api/call.js

// Function to initiate a call
export const initiateCall = async (calleeId) => {
    try {
      // Make an API call to your backend to initiate the call
      const response = await fetch('/api/call/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ calleeId }),
      });
      
      // Parse the response and return the result
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error initiating call:', error);
      throw new Error('Failed to initiate call');
    }
  };
  
  // Function to accept a call
  export const acceptCall = async () => {
    try {
      // Make an API call to your backend to accept the call
      const response = await fetch('/api/call/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Parse the response and return the result
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error accepting call:', error);
      throw new Error('Failed to accept call');
    }
  };
  
  // Function to reject a call
  export const rejectCall = async () => {
    try {
      // Make an API call to your backend to reject the call
      const response = await fetch('/api/call/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Parse the response and return the result
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error rejecting call:', error);
      throw new Error('Failed to reject call');
    }
  };
  
  // Function to end a call
  export const endCall = async () => {
    try {
      // Make an API call to your backend to end the call
      const response = await fetch('/api/call/end', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Parse the response and return the result
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error ending call:', error);
      throw new Error('Failed to end call');
    }
  };
  