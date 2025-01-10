import {
  Box,
  Card,
  CardContent,
  CardContentProps,
  Link,
  styled,
  Typography,
} from "@mui/joy";
import { colors } from "src/styles/colors";

export interface PrivacyPolicyProps {
  cardContentProps?: CardContentProps;
}

const TextDetail = styled(Typography)(() => ({
  color: colors["text-secondary"],
}));

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ cardContentProps }) => {
  return (
    <Box>
      <Typography
        level="h3"
        sx={{
          fontWeight: 500,
          color: colors["text-primary"],
          marginTop: "24px",
        }}
      >
        Privacy Policy
      </Typography>
      <Card
        sx={(theme) => ({
          border: 1,
          borderColor: theme.color.divider,
        })}
      >
        <CardContent
          {...cardContentProps}
          sx={{
            px: 16,
            py: 12,
            maxHeight: 360,
            overflow: "auto",
            ...cardContentProps?.sx,
          }}
        >
          <TextDetail
            level="body1"
            sx={{
              marginTop: "4px",
            }}
          >
            This privacy policy (the “Policy”) describes the privacy policies
            and practices of Launch Point Limited (“us”, “we”, “our” or “Launch
            Point”) for Services and other matter offered through Launch Point’s
            website at{" "}
            <Link
              href="https://www.launchpoint-astra.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.launchpoint-astra.com
            </Link>{" "}
            (the “Site”). This Policy aims to provide a summary of the type of
            personal data that we collect through the Site, how such personal
            data is used, transferred, disclosed, shared and stored. This Policy
            does not cover any external third party websites that may be
            accessed through links provided on our Site.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            To better protect your personal data, we provide this notice
            explaining our online information practices. Launch Point is
            committed to the full implementation and compliance with the six
            data protection principles and the requirements of the Personal Data
            (Privacy) Ordinance (Cap. 486, Laws of Hong Kong) to safeguarding
            your personal data.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            By visiting or accessing this Site, or by registering for our Site,
            or by using this Site or the equity crowdfunding related services
            made available through the Site (“Services”), you thereby agree to
            this Policy. In providing investment opportunities to Professional
            Investors (“PI”), as defined by the Securities and Futures Ordinance
            (Cap. 571, Laws of Hong Kong), we will gather personal data from the
            prospective PI to assess both the PI’s suitability and risk profile.
            In providing fundraising opportunities to a startup who has signed
            the relevant startup agreement with Launch Point (“Startup”), we
            will gather personal data from the Startup’s shareholders,
            directors, officers, senior managers and employees to allow Launch
            Point and potential investors to review, assess and conduct checks
            on the Startup’s business. Save for those expressly provided in this
            Policy, we will not use this personal data for any other purpose nor
            disseminate this personal data to any third parties.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            In connection with the Services, you will be signing additional
            agreements with Launch Point or its affiliate(s) or other third
            parties. In the event of conflicts between the terms of such
            agreements and the terms of this Policy, the terms of this Policy
            will prevail insofar as it relates to Launch Point’s commitments
            related to protection of your personal data collected through this
            Site.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            The terms of this Policy have been drafted solely in accordance with
            the laws of Hong Kong and are therefore subject to Hong Kong law. We
            do not represent or warrant that this Policy complies with the
            privacy laws of any other jurisdiction and accordingly, you shall
            not construe this Policy as such.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Personal Information Collection Statement
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Launch Point will use, share, transfer and disclose such personal
            data for the purposes and in the manner described in this Policy.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Personal data means any information relating to an individual from
            which the identity of the individual can be ascertained, directly or
            indirectly. We respect your personal data. Launch Point collects
            personal data you provide or upload through the Site. There are
            portions of our online
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Services where we may collect personal data for identification
            purposes, to fulfill your online requests, or where we believe it is
            reasonably required for provision of our Services. The information
            we collect varies based on our Services you choose to use through
            the Site.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Examples of personal data Launch Point may collect include, without
            limitation, the following information:
          </TextDetail>
          <TextDetail level="body1">
            <ul>
              <li>name;</li>
              <li>postal or email address;</li>
              <li>telephone, fax, mobile numbers;</li>
              <li>account number, username and password;</li>
              <li>residential or other correspondence addresses;</li>
              <li>identity card, passport and visa details;</li>
              <li>nationality or residency status;</li>
              <li>age and gender;</li>
              <li>
                details of your spouse, children or other beneficiaries (if
                any);
              </li>
              <li>education level and details (where applicable);</li>
              <li>employment information (where applicable);</li>
              <li>
                details of regulatory registration and disciplinary or court
                actions (if any);
              </li>
              <li>
                financial statements or reports and financial status, intention
                or goals (where applicable);
              </li>
              <li>income or assets information (where applicable);</li>
              <li>bank account details (where applicable);</li>
              <li>facebook ID and first name displayed in facebook;</li>
              <li>LinkedIn ID and related information;</li>
              <li>
                preferences related to any investment, products or services;
              </li>
              <li>communications between you and Launch Point; and</li>
              <li>data regarding your visits to and use of the Site.</li>
            </ul>
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            When you visit the Site or use our Services through the Site, we may
            automatically collect certain data which may, when combined with
            other information about you, be personal data, including but not
            limited to:
          </TextDetail>
          <TextDetail level="body1">
            <ul>
              <li>
                attributes of the computer or other device you are using, such
                as the operating system, hardware version, device settings,
                software and device identifiers;
              </li>
              <li>
                computer or other device locations, including specific
                geographic locations identified through GPS, Bluetooth or WiFi
                signals or other means;
              </li>
              <li>
                connection information such as the name of your mobile operator,
                ISP or other service provider, browser type and IP address;
              </li>
              <li>the website from which you have reached the Site;</li>
              <li>
                the pages on our Site you viewed or visited, average time spent
                on these pages and when they were viewed or visited;
              </li>
              <li>
                details of the information and Services on the Site that you
                look at, information, tools and content available on the Site
                that you use; and
              </li>
              <li>links from the Site that you click on.</li>
            </ul>
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            User-Supplied Information
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Upon performing the registration process, you will be asked to
            provide certain information (including but not limited to personal
            data), such as your first and last name, residence, Hong Kong
            identity card or passport and other identifying information, email
            address, gender and birthday, proof of address as well as a username
            and password and certain financial information. The username and
            password are used to ensure that no user other than yourself will
            have access to such information you have provided. You are solely
            responsible for maintaining the secrecy of any password you use to
            register, and you should always be careful whenever disclosing
            information online.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            In addition, we receive and store any information you enter on our
            Site or give us in any other way (for example, in the course of
            subscribing for particular investments, otherwise using the Site or
            other communications with us (through the Site or any other social
            networks, or otherwise), or as contained in written documents you
            provide). This includes information that can identify you. The
            amount of personally identifying information you provide is up to
            you, and you are not legally obligated to provide such information.
            However, your use of the Site or the Services may be curtailed if
            certain of such information is not provided.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We may use third party contractors to collect and aggregate this
            information. For more information, please see Information Collected
            by Means of Technology below.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            The Site and Services may only be used by individuals over the age
            of 18.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Use of Cookies
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We may collect some information automatically from your computer,
            without notice such as your Internet Protocol (IP) address, computer
            and connection information, browser type and version, operating
            system, Internet Service Provider (ISP), timestamps, banner
            advertisement you click on, the URLs you come from and go to next,
            and a cookie number.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Launch Point, together with our service providers and Launch Point’s
            affiliates (including holding company(ies), subsidiary(ies) and
            subsidiary(ies) of such holding company(ies) or any affiliated
            company under the same control, of Launch Point or its holding
            company(ies), all together referred to as “Launch Point
            Affiliates”), will sometimes place anonymous cookies or web beacons
            on your computer or other device when you visit the Site, interact
            with us or click on any online advertisements through our Site. Your
            browser must be set to accept cookies in order to access Launch
            Point as a registered user. Cookies are small pieces of data sent
            from a website and stored on a device. Cookies may enable us to
            capture and compile statistical information about how you use our
            online Services. Web beacons are invisible tags and may be placed on
            a webpage or email or other message, which usually work in
            conjunction with cookies, registering when a particular device
            visits a particular page. We use these cookies and web beacons to
            recognise returning users and your preference within our Site,
            provide relevant content and services using your visited pages and
            the website links you have followed to, measure traffic and activity
            on the Site and your browsing behaviour, monitor and improve our
            Services and protect against fraud.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Most web browsers are initially set up to accept cookies. Should you
            wish not to be tracked by this kind of technology, you can block all
            cookies (including strictly necessary cookies) by changing the
            settings on your web browser (consult your browser help menu to find
            out how), but doing so may prevent us from delivering certain
            Services to you through the Site or prevent you from using the Site
            properly. We do not link the information we store in cookies to any
            personally identifiable information (“PII”) you submit while on our
            Site.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We also may allow advertisers to occasionally use our Site and they
            may also use cookies on the Site or track and collect information
            about your online activities over time through cookies, web beacons
            or other similar technology. Advertisers’ use of cookies, web
            beacons and/or other similar technology is subject to their own
            privacy policies, and we have no access to or control over such
            cookies, web beacons and other similar technology.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Purpose of Collection
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            For the purposes of the provision of Services by Launch Point, it is
            necessary for you, being a user of the Services, to supply Launch
            Point with personal data for:
          </TextDetail>
          <TextDetail level="body1">
            <ul>
              <li>creating and maintaining user account with Launch Point;</li>
              <li>
                considering and processing applications for Services and the
                daily operation of the Site;
              </li>
              <li>
                assessing the suitability and risk profile of users of the Site;
              </li>
              <li>
                creating profile, establishing data room and conducting due
                diligence through the Site;
              </li>
              <li>
                using and maintaining the Services provided by Launch Point
                (either through the Site or otherwise), or to be provided by
                Launch Point Affiliates or other third party service providers
                through the Site;
              </li>
              <li>
                interacting with Launch Point, any of the Launch Point
                Affiliates or third party service providers through the Site;
              </li>
              <li>
                carrying out post-completion matters for any transaction(s) you
                entered into;
              </li>
              <li>
                subject to obtaining consent of the users, promoting services
                and products and conducting direct marketing services;
              </li>
              <li>
                any other purposes relating to the Services, or any other equity
                crowdfunding related services you requested through the Site, to
                be provided by Launch Point, any of Launch Point Affiliates or
                other third party service providers; and
              </li>
              <li>
                any other purposes relating to any of the purposes listed above.
              </li>
            </ul>
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Personal data and aggregated information collected are also used for
            legal and compliance reasons on our part under applicable laws,
            which shall include:
          </TextDetail>
          <TextDetail level="body1">
            <ul>
              <li>
                conducting know-your-client, due diligence and identification
                verification procedures for opening of accounts and ongoing
                monitoring purposes;
              </li>
              <li>
                conducting financial or assets background checks whenever
                appropriate;
              </li>
              <li>
                other monitoring and compliance procedures in line with our
                internal risk management procedures, audit/financial accounting
                and for other reporting purposes;
              </li>
              <li>enforcement of legal rights; and</li>
              <li>
                disclosure to law enforcement bodies/agencies, regulators and
                other relevant authorities for crime prevention and detection
                purposes.
              </li>
            </ul>
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Personal data may also be obtained from public domain through
            different channels, including but not limited to public registers,
            public search engines, public directories or social media with
            public view setting, for considering and processing applications for
            Services or products to be provided by Launch Point, any of the
            Launch Point Affiliates or other third party service providers.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Use of Personal Data
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Personal data collected will be used by Launch Point, and its
            employees and consultants and may be transferred by Launch Point to
            Launch Point Affiliates and their respective service providers,
            legal advisers, BVI registered agents (where applicable), banks,
            accountants and auditors in connection with the operation and
            management of the Site and provision of the Services, or to any
            other users who are registered with us as “startup” or “professional
            investor” in accordance with your instructions, to enhance
            performance of the Site, to tailor the Site to users’ preferences,
            and to analyse trends, including, without limitation, as follows:
          </TextDetail>
          <TextDetail level="body1">
            <ul>
              <li>
                To enable us to verify your credentials, in order to maintain
                reasonable security, provide developers with the information
                that is useful in developing new features and Services for our
                users, enable us to develop and improve the features, contents,
                and Services available, fulfil your requests for our products
                and Services, in connection with your use of the Site or
                Services, to respond to your inquiries about our Services, to
                offer you our products or Services that we believe may be of
                interest to you, to carry out transactions which you have
                requested, to enforce our rights and resolve disputes.
              </li>
              <li>
                We will retain information transmitted to us in the context of
                use of Services for further internal use in connection with our
                efforts to improve our Services and products.
              </li>
              <li>
                We may use non-personally identifying information that we
                collect to provide statistical information about users of the
                Site or Services, to improve the quality, design and content of
                our Site, to analyse the use of our Site and to cooperate with
                law enforcement.
              </li>
            </ul>
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We cannot use your personal data for marketing or offering our
            products or Services to you unless we have received your consent or
            indication of no objection to such marketing or offering.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Disclosure
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We may provide your personal data to other third parties, such as
            advertisers or business partners within our Site. Where we provide
            such information to third parties, other than for use on our behalf,
            it will be provided either in aggregated form that does not identify
            your identity, or in a form that does not link the information to
            any PII. In other words, we will only provide to such third parties
            non-personally identifiable identification (for example, gender) in
            connection with an IP address.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We will not sell, share (other than sharing with Launch Point
            Affiliates and third party service providers as described in this
            Policy), rent or trade your personal data or information with third
            parties unless we have your consent.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We may disclose or transfer your personal data or information to:
          </TextDetail>
          <TextDetail level="body1">
            <ul>
              <li>
                Third-party vendors who provide services or products to us for
                operation of the Site or provision of our Services or facilitate
                or evaluate the Sites or Services, such as e- mail service
                providers sending emails on our behalf
              </li>
              <li>
                Launch Point Affiliates that are involved in operating or
                providing the Services. We may share your personal data or
                information with Launch Point Affiliates. Launch Point
                Affiliates will follow practices that are at least as
                restrictive as the practices described in this Policy, including
                requests that personal data or information will only be used to
                provide you with Services.
              </li>
              <li>
                We may share aggregated or anonymous data with third parties for
                any use whatsoever without restriction.
              </li>
            </ul>
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We also may share or provide your personal data or information:
          </TextDetail>
          <TextDetail level="body1">
            <ul>
              <li>
                In response to subpoenas, court orders, or other legal process
                or in response to a law enforcement agency’s request; to
                establish or exercise our legal rights; to defend against legal
                claims; or as we reasonably believe appropriate to comply with
                applicable laws, regulations, orders, legal processes or
                government or regulatory requests, as well as in order to comply
                with anti-money laundering laws and regulations. In such cases
                we reserve the exclusive right to raise or waive any legal
                objection or right available to us.
              </li>
              <li>
                When we believe it is appropriate to investigate, prevent, or
                take action regarding illegal or suspected illegal activities;
                to protect and defend the rights, property, or safety of Launch
                Point or any Launch Point Affiliates, or this Site, our
                customers, or others; and in connection with our Terms of Use
                and the terms of other agreements to which Launch Point or any
                of Launch Point Affiliates is a party, including where we
                believe you may have breached such Terms of Use or the terms of
                such agreements, to detect, prevent or otherwise address fraud
                or illegal behaviour, security or technical issues, or protect
                against imminent harm to the rights, property or safety of
                Launch Point or any of Launch Point Affiliates, or users or the
                public as required or permitted by law.
              </li>
              <li>
                In the event that Launch Point goes through a business
                transition, such as a merger, acquisition by another company, or
                sale of all or a portion of its assets, your PII will likely be
                among the assets transferred.
              </li>
            </ul>
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Other than as set out above, you will be notified when your personal
            data or information will be shared with third parties, and you will
            have an opportunity to choose not to have any of them shared.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Cross-border Transfer
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            By using our Site or Services, you consent to transfer PII to Launch
            Point Affiliates or such third party vendors (as described in this
            Policy) outside your country but only for purposes of performing the
            Services for which you provided your PII, even to countries that
            might not offer a level of protection for your PII that is
            equivalent to the one offered in your country of residence. We will
            obtain your express consent, however, before using your PII for any
            purposes other than performing the Services for which you provided
            the PII.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Notifications and Direct Marketing
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            The Site sends new registered users a welcoming email to verify
            password and username. After you register with the Site, subject to
            your consent to direct marketing services, we may send you on a
            regular basis via emails information on other services or products
            (other than the updates on the Site or the Services) that we believe
            may be of interest to you. Out of respect for your personal data, we
            give you the option at all times to opt-out of these types of
            communications. By choosing not to opt out, you consent to these
            communications.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            The Site may also send you notifications regarding updates to the
            Site and Services. We may also communicate with you to provide
            requested Services and with respect to issues relating to your
            account via email or phone. You will not be able to opt-out of
            service announcements that contain important information about the
            Service.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Opt-out
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            You may ‘opt-out’ of having your personal data or information used
            for any purpose not directly related to the Site upon registration
            to the Site. You may not opt out of administrative emails (for
            example, electronic delivery of financial information, or emails
            about your transactions or our policy changes). However, if you no
            longer wish to receive additional information or promotional
            materials from Launch Point, you may opt-out of receiving these
            communications by sending an email with the word ‘unsubscribe’ in
            the subject line or otherwise sending a request to
            compliance@launchpoint.com.hk
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Access and Correction of Personal Information
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Under the Personal Data (Privacy) Ordinance (Cap. 486, Laws of Hong
            Kong), you have the right: (a) to check whether Launch Point holds
            personal data about you and to access such data; and (b) to require
            Launch Point to correct, amend or update your personal data. Launch
            Point encourages you to review your information regularly to ensure
            that it is correct and complete. As a registered user, you can
            access to and correct, change or update your personal data or
            information by emailing us at compliance@launchpoint.com.hk. In
            accordance with the Personal Data (Privacy) Ordinance (Cap. 486,
            Laws of Hong Kong), we have the right to charge a reasonable fee for
            the processing of any data access request.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Links
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            The Site contains links to other sites. The inclusion of such links
            does not imply our endorsement of the linked website or service.
            Information you disclose to other parties or through such websites
            is subject to the privacy practices and policies of those parties or
            websites. Launch Point is not responsible for the content or
            security of such linked websites or services and has no liability
            for privacy policies and/or practices on other sites. We disclaim
            all liability whatsoever with regard to your access to such linked
            websites or services. We advise you to read the privacy policy
            stated on other sites you link to through the Site. Our Policy only
            governs information that we collect by Launch Point on the Site or
            through other means.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Security
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We take appropriate precautions to protect users’ personal data or
            information by using physical as well as technological security
            devices. Additionally, we have implemented physical, electronic and
            procedural safeguards that are designed to protect the security of
            your personal data or information in compliance with Personal Data
            (Privacy) Ordinance (Cap. 486, Laws of Hong Kong). These include
            advanced firewall and password protection for our databases,
            physical access controls to our buildings and files, and restricted
            access to your personal data or information to employees that need
            to know that data or information to provide, operate, maintain,
            develop or improve our Services. We have invested in leading-edge
            security software, systems and procedures to offer you a safe and
            secure investing Site and protect your personal, financial and
            investment information. While no security system is absolutely
            impenetrable, we will continually monitor the effectiveness of our
            security system and refine and upgrade our security technology as
            new tools become available. Launch Point’s employees are kept up-to-
            date on security and privacy practices. As the use of internet is
            not entirely secure and for this reason we cannot guarantee the
            security or integrity of any personal data or information which is
            transferred from you or to you via the internet. You should also be
            mindful that you are responsible for keeping your access rights
            confidential and secure at all times. If you have any questions
            about the security measures we use on the Site please contact us by
            sending an email to compliance@launchpoint.com.hk
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Retention
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Personal data will be held for as long as it is necessary to fulfil
            the purpose for which it was collected, or as required or permitted
            by applicable law. We will retain your data or information for as
            long as your account is active or as needed to provide you Services
            or as required in accordance with applicable law.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            You can also request that we close your Launch Point account, or
            request that we no longer use your personal data or information to
            provide you Services, by emailing us at compliance
            @launchpoint.com.hk. After we close your account, we may retain some
            personal data or information to comply with law, prevent fraud,
            assist with investigations, resolve disputes, analyse or
            troubleshoot programs, enforce our Terms of Use and take actions
            otherwise permitted by law. If your account is terminated or
            suspended, we may retain some personal data or information to
            prevent re-registration.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Launch Point shall cease to retain personal data/information or
            remove the means by which personal data/information can be
            associated with particular user, as soon as it is reasonable to
            assume that the purpose for which that personal data/information was
            collected is no longer valid and retention of such personal
            data/information is no longer necessary for legal or business
            purposes.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Notification of Changes
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            This Policy may change from time to time and we will post the
            amended terms on the Launch Point Site and notify you by email of
            major changes. Amended terms will take effect immediately for new
            users, and 30 days (or such longer period as may be required by
            applicable law) after they are posted for existing users. You should
            review our Policy periodically to ensure that you have received the
            latest version and our updates. You agree to accept posting of a
            revised Policy as actual notice to you.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Your continued use of the Site after any changes to this Policy have
            been posted (or, if applicable, notified) signifies your acceptance
            of those changes.
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            If we become involved in a merger or acquisition or sale of assets,
            we will provide notice before personal data or information is
            transferred or becomes subject to a different privacy policy.
          </TextDetail>

          <Typography
            level="h5"
            sx={{
              marginTop: "20px",
            }}
          >
            Contact Us
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            We are strongly committed to our relationship with you and want to
            be sure you understand the steps we have taken to protect your
            personal data or information. If you have questions or feedback
            regarding our Policy, you may direct them to
            support@launchpoint.com.hk. We will make every effort to answer your
            questions.
          </TextDetail>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrivacyPolicy;
