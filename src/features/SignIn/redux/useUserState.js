import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '../../../redux/reducer';
// var jwt = require('jsonwebtoken');
// const pubKey = `"d1929ff45c609ec4c48ebef0fb1392c39132d9a1": "-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIBmlNBzMllL0wDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAxMmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjAx\nMDI4MDkyMDA4WhcNMjAxMTEzMjEzNTA4WjAxMS8wLQYDVQQDEyZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALEttfN5HIkAME3+NZxxAuMrFWzoCQE6GyFppeg0pLwVMItl\ni2EgQxt4iVzhPeVfxtWaJgK8Ld02Y9HCAoyb2VsrOdPWOB99JvF6sor0elA2r3C/\nN2BpJLl21VO59OeslX8tKxxEf8aJzor8HiDcfrI8lVzkjbbU8IvWZidYuuQ3j0x7\nm/95559bMOJoDL+Mnw7PblJDj8XFQLjek3AHFZLkmCtUF4f+ac7KRBZrqnvNUmX4\nb6cBZSESpYa2xlf1IKAI957lkIBBKHBpueQleRvWL715M63VPN1agbr/qjdkLgyf\nkqL619P1KeiKpfa5kZRKuxqsNP/4yaX1Ps3LknsCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAFFFf592/owU2DjjiNAbJMJ3SFBg5ISHbJu2wDkTA2Ld\n7Egs9w3p1Mlqivw0kbspqRRLZk2a5etEdE4TXguo/0pHJevsVcyOlxwSijucCoj0\ncUCkgrpaXbDLotBiuxA2zKNME3PHLQEoCVEEeH9SdE1wO9KdSTi8l/ML2szOsnaL\nf2Imj7hbWbJWDlLjbF6iDF9i7LoyqUXHX1AiAsi0q6aaQAwpi8iEtD+JxlrMukn+\nfJzdBE2o9y6gFz16Jr5Tz9aQ3+uQi556UJB+bHl/5fe7MDViRa3/BgDlDiItTIUs\n3euXZFhqTXz6AVhmlFYc1ulCemOK/VZrpT1gVvzEkjk=\n-----END CERTIFICATE-----\n",
//     "d10c8f8b0dc7f55e2b3541f29e5ac3743f77ccee": "-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIISUGbnUP449gwDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAxMmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjAx\nMDIwMDkyMDA4WhcNMjAxMTA1MjEzNTA4WjAxMS8wLQYDVQQDEyZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBAOV41dXqAacQfFFz1tPxkCm1izeBtMSESVFAChXq85+6gD6P\n+aeWnvyFS8lRXHw3vRndLcFIfPutYQbxZIcr2QG8kWo8V+/alaepiAtJyX3BKcEK\nxHY6z6ntJMhV6p//pBm8qw/ybo8bKI3sPMYSxqpR+SE9H34eox4HaSZlTeWlOK5m\nrWD1B0rA6gBeBtb/X7SAdCR5jXs7r3cc+FansSQ0sN4cKVfpjfXT2vOOdjRSKa8g\nWYmUn4g40s1mdqZkh91eUYW85ZWhtuQ8pIfsCJB86C+yOxglHcA9d9aeoNOyHdT4\nBXYYAsSMbcgL0P4efMt2YpqgpHPJ303cY/keln0CAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAB9Q16CvmJCJxs3D6RdGNc3Fp5872OEHvmMaHYf0n3jj\nbnCsHrHApY8Nbe4ktQz32lPNYWvQyHfBPkM+KwrPHBHvBSKxcij2aU9QI4FJWa39\nM1FOw3aM1q+ktipB9Hsb8X0ZkuTeoOGLP8ucqSXa8Rrjzw88zL/OlZ/tf04Xybx1\nKe6gdFVf3/kbrFQLWREQPSUW9S/X0k/T+lC4vStnux0l5o/xC2gucQeHy1lvoVZ3\nMN6Cxu2+N3sICstuVLMNI930mursR604YQLSN2GX5oVEYJI3NDWMLouVyQVqRJU2\n31vQ+LmVTylJVQIo/PWADN1cfDW2IpsNp5AMIQ6B2RA=\n-----END CERTIFICATE-----\n"`
// Using reducer from src\redux\reducer.ts
const useUserState = (provider = 'firebase') => {
    const authProvider = provider;

    const dispatch = useDispatch();

    const fetchData = (user) => {
        dispatch(userSlice.actions.fetch({ ...user, authProvider }))
    }

    // const isTokenValid = (token) => {
    //     // const result =  jwt.verify(token, pubKey)
    //     // return result;
    //     return true;
    // }

    return {
        data: useSelector((state) => state.user.data),
        loading: useSelector((state) => state.user.loading),
        error: useSelector((state) => state.user.error),
        //TODO: Calculate isValid based on validity of the token. If the token is expired then the user is no longer valid. In the validation grab the public key and validate token signature as well.
        fetchData
    }
}

export default useUserState;