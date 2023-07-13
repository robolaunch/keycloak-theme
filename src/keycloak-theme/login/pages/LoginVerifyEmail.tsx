import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function LoginVerifyEmail(
  props: PageProps<
    Extract<KcContext, { pageId: "login-verify-email.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { msg } = i18n;

  const { url, user } = kcContext;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={msg("emailVerifyTitle")}
    >
      <div className="instruction-container">
        <p className="instruction">
          {msg("emailVerifyInstruction1", user?.email)}
        </p>
        <p className="instruction">
          {msg("emailVerifyInstruction2")}
          <br />
          <a className="instruction-resend" href={url.loginAction}>
            {msg("doClickHere")}
          </a>
          &nbsp;
          {msg("emailVerifyInstruction3")}
        </p>

        <a className="instruction-back-login" href={url?.loginRestartFlowUrl}>
          Back to Login
        </a>
      </div>
    </Template>
  );
}
