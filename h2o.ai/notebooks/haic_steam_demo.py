# Connecting to Steam in the H2O AI Cloud
#
# Python Library Requirements:
# https://enterprise-steam.s3.amazonaws.com/release/1.8.10/python/h2osteam-1.8.10-py2.py3-none-any.whl
# https://s3.amazonaws.com/artifacts.h2o.ai/releases/ai/h2o/mlops/rel-0.51.0/2/h2o_mlops_client-0.51.0%2Bb8449c1.rel0.51.0.2-py2.py3-none-any.whl
#
# Notes:
# HAIC components require using your HAIC token to login, rather than a username and password
# Generate your Refresh Token by visiting: https://cloud.h2o.ai/auth/get-platform-token


from getpass import getpass
import h2osteam
import h2o_mlops_client as mlops

print("Click [this URL](https://cloud.h2o.ai/auth/get-platform-token) to get your personalized access token: ")

tp = mlops.TokenProvider(
    token_endpoint_url="https://auth.cloud.h2o.ai/auth/realms/hac/protocol/openid-connect/token",
    client_id="hac-platform-public",
    refresh_token=getpass("Enter your H2O AI Cloud Token: "),
)
steam = h2osteam.login(
    url="https://steam.cloud.h2o.ai/",
    access_token=tp.ensure_fresh_token(),
)
dai_instance_count = len(steam.get_driverless_instances())
print(f"You have {dai_instance_count} instances of Driverless AI.")


