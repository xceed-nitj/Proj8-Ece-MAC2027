// envUtils.js

  
async function checkServer(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
   // console.log("server is not ok"); //incase server is not ok it will return false
    return false;
  }
}

function getEnvironment() {
   //const development = 'http://localhost:8010';
  const production = 'https://nitjtt.onrender.com';
  const nitjServer = 'https://xceed.nitj.ac.in';

  const currentURL = window.location.href;
   if (currentURL.includes('nitjtt')) {
    return Promise.resolve(production);
  } else {
    return checkServer(nitjServer).then(isNitjServerUp => isNitjServerUp ? nitjServer : production); 
    //if xceed is not working it will use nitjtt.onrender.com
  }
}

export default getEnvironment;

/*
function getEnvironment() {
      const currentURL = window.location.href;
      //const development = 'http://localhost:8010';
      const production = 'https://nitjtt.onrender.com';
       const nitjServer = 'https://xceed.nitj.ac.in';
    //for time being using nijtt server use 
      if (currentURL.includes('localhost')) {
        return nitjServer;
      } else if (currentURL.includes('nitjtt')) {
        return production;
      } else {
        // Default to a specific environment or handle other cases
        return nitjServer;
      }
    }
    
  export default getEnvironment;
  */
