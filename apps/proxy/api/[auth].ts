import { Auth, setEnvDefaults, type AuthConfig } from "@emulienfou/auth-core"
import Apple from "@emulienfou/auth-core/providers/apple"
import Auth0 from "@emulienfou/auth-core/providers/auth0"
import AzureB2C from "@emulienfou/auth-core/providers/azure-ad-b2c"
import BankId from "@emulienfou/auth-core/providers/bankid-no"
import BoxyHQSAML from "@emulienfou/auth-core/providers/boxyhq-saml"
import Cognito from "@emulienfou/auth-core/providers/cognito"
import Coinbase from "@emulienfou/auth-core/providers/coinbase"
import Discord from "@emulienfou/auth-core/providers/discord"
import Dropbox from "@emulienfou/auth-core/providers/dropbox"
import Facebook from "@emulienfou/auth-core/providers/facebook"
import GitHub from "@emulienfou/auth-core/providers/github"
import GitLab from "@emulienfou/auth-core/providers/gitlab"
import Google from "@emulienfou/auth-core/providers/google"
import Hubspot from "@emulienfou/auth-core/providers/hubspot"
import Keycloak from "@emulienfou/auth-core/providers/keycloak"
import LinkedIn from "@emulienfou/auth-core/providers/linkedin"
import Netlify from "@emulienfou/auth-core/providers/netlify"
import Okta from "@emulienfou/auth-core/providers/okta"
import Passage from "@emulienfou/auth-core/providers/passage"
import Pinterest from "@emulienfou/auth-core/providers/pinterest"
import Reddit from "@emulienfou/auth-core/providers/reddit"
import Slack from "@emulienfou/auth-core/providers/slack"
import Spotify from "@emulienfou/auth-core/providers/spotify"
import Twitch from "@emulienfou/auth-core/providers/twitch"
import Twitter from "@emulienfou/auth-core/providers/twitter"
import Vipps from "@emulienfou/auth-core/providers/vipps"
import WorkOS from "@emulienfou/auth-core/providers/workos"
import Zoom from "@emulienfou/auth-core/providers/zoom"

const authConfig: AuthConfig = {
  providers: [
    Apple,
    Auth0,
    AzureB2C({
      clientId: process.env.AUTH_AZURE_AD_B2C_ID,
      clientSecret: process.env.AUTH_AZURE_AD_B2C_SECRET,
      issuer: process.env.AUTH_AZURE_AD_B2C_ISSUER,
    }),
    BankId,
    BoxyHQSAML({
      clientId: "dummy",
      clientSecret: "dummy",
      issuer: process.env.AUTH_BOXYHQ_SAML_ISSUER,
    }),
    Cognito,
    Coinbase,
    Discord,
    Dropbox,
    Facebook,
    GitHub,
    GitLab,
    Google,
    Hubspot,
    Keycloak,
    LinkedIn,
    Netlify,
    Okta,
    Passage,
    Pinterest,
    Reddit,
    Slack,
    Spotify,
    Twitch,
    Twitter,
    Vipps,
    WorkOS,
    Zoom,
    {
      id: "tiktok",
      name: "TikTok",
      type: "oauth",
      checks: ["state"],
      clientId: process.env.AUTH_TIKTOK_ID,
      clientSecret: process.env.AUTH_TIKTOK_SECRET,
      authorization: {
        url: "https://www.tiktok.com/v2/auth/authorize",
        params: {
          client_key: process.env.AUTH_TIKTOK_ID,
          scope: "user.info.basic",
        },
      },
      token: "https://open.tiktokapis.com/v2/oauth/token/",
      userinfo:
        "https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,username",
      profile(profile: any) {
        return profile
      },
      style: {
        bg: "#000",
        text: "#fff",
      },
    },
  ],
  basePath: "/api",
}
setEnvDefaults(process.env, authConfig)

export default function handler(req: Request) {
  return Auth(req, authConfig)
}

export const config = { runtime: "edge" }
