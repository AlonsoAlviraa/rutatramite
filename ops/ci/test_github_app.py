import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import jwt
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
import github_app


class AppAuthenticationTests(unittest.TestCase):
    def test_numeric_app_id_produces_valid_string_issuer_and_scoped_token(self):
        key=rsa.generate_private_key(public_exponent=65537,key_size=2048)
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory)
            pem=root/'key.pem'
            pem.write_bytes(key.private_bytes(serialization.Encoding.PEM,serialization.PrivateFormat.PKCS8,serialization.NoEncryption()))
            config=root/'app.json'
            config.write_text(json.dumps({'app_id':4945898,'installation_id':161748368,'private_key':str(pem)}))
            with patch.object(github_app,'CONFIG',config),patch.object(github_app,'request',return_value={'token':'fixture-token'}) as request:
                self.assertEqual(github_app.token('rutatramite',True,True),'fixture-token')
            path,signed,body=request.call_args.args
            claims=jwt.decode(signed,key.public_key(),algorithms=['RS256'],issuer='4945898')
            self.assertLessEqual(claims['exp']-claims['iat'],600)
            self.assertEqual(path,'app/installations/161748368/access_tokens')
            self.assertEqual(body['repositories'],['rutatramite'])
            self.assertEqual(body['permissions'],{'contents':'read','metadata':'read','statuses':'write','pull_requests':'read'})


if __name__=='__main__':unittest.main()
