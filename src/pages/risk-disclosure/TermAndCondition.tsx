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

const TextDetail = styled(Typography)(() => ({
  color: colors["text-secondary"],
}));

interface TermsAndConditionsProps {
  cardContentProps?: CardContentProps;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  cardContentProps,
}) => (
  <Box>
    <Typography
      level="h3"
      sx={{
        fontWeight: 500,
        color: colors["text-primary"],
        marginTop: "24px",
      }}
    >
      Terms and Conditions
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
          These terms and conditions (“Terms”) apply to any person (“you” or
          “your”) accessing or using the website operated by Launch Point
          Limited (“Launch Point”, “we”, “us”, or “our”) at{" "}
          <Link href="http://www.launchpoint-astra.com" target="_blank">
            www.launchpoint-astra.com
          </Link>{" "}
          (“Site”) and/or the services owned and operated by Launch Point or its
          affiliate(s) through the Site (“Services”). By using the Site and/or
          Services, you are indicating your consent to be bound by these Terms.
          Your continued use of the Site or the Services shall constitute your
          acceptance of these Terms. If you are an authorized representative of
          another person (e.g., a company), that person will be bound by these
          Terms by your accessing or using or continuing to access or use the
          Site and/or the Services. If you (or any person(s) represented by you)
          do not accept these Terms, Launch Point will not provide you with
          access to the Site or Services, and you must immediately stop using or
          discontinue your use of this Site and the Services.
        </TextDetail>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          Your use of the Site or the Services may be monitored by Launch Point,
          and the information you provide may be used by Launch Point for its
          internal business purposes or in accordance with the applicable laws
          and/or the rules, codes and guidelines from time to time issued by any
          applicable regulatory body(ies). In the interest of security, Launch
          Point reserves the right to record all telephone conversations,
          internet conversations (including, without limitation, chats) and any
          meetings between you and Launch Point.
        </TextDetail>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          Launch Point reserves the right, at any time and from time to time, in
          the interests of its own editorial discretion and business judgement
          to add, modify or remove any of the information or materials available
          on the Site. These Terms are not intended to, and will not, transfer
          or grant any rights in or to the information or materials (other than
          those which are specifically described herein) and all rights not
          expressly granted herein are reserved by Launch Point, its
          affiliates(s) and other third party providers from whom Launch Point
          has obtained the information or materials.
        </TextDetail>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          Launch Point may, in compliance with any applicable law, exercise full
          discretion in modifying or discontinuing any part or whole of the Site
          or the Services at any time without cause or prior notice.
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Your Account
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          You agree that any information provided by you on or to this Site is
          true, complete and accurate. You agree to inform us promptly on
          becoming aware that any information you have provided to us is or has
          become untrue, incomplete or inaccurate. If you provide information
          that is or becomes untrue, incomplete or inaccurate, or we have
          grounds to suspect that such information is untrue, incomplete or
          inaccurate, without limiting any other right or remedy available to
          us, we may limit, suspend or terminate your access to this Site and
          the Services.
        </TextDetail>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          Access to certain parts of this Site or the Services requires you to
          register an account with us. You may access those certain parts of the
          Site or the Services using your username and password, set up by you.
          Your account is personal to you and is not transferable. You are
          responsible for keeping, protecting and securing your username and
          password from unauthorised use and disclosure. You agree to take all
          responsibility for all statements made, all acts or omissions that
          occur and all activities that take place under or through your
          account, and to notify us immediately upon you becoming aware of, or
          if you believe there has been, any unauthorised use of your account or
          any other breach of security for any of your information stored on the
          Site. We reserve the right to take any action we deem appropriate on
          receiving notification of unauthorised use of your account or a breach
          of security.
        </TextDetail>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          Certain aspects of this Site or the Services may be governed by
          additional terms and conditions. You are also required to read and
          abide by any additional terms and conditions that may be posted on
          this Site from time to time concerning the information or materials
          obtained from specific third party providers. You agree to comply with
          any such further terms and conditions and with all relevant laws and
          rules that apply to your use of that aspect of the Site or the
          Services.
        </TextDetail>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          You acknowledge and agree that, except as otherwise expressly
          permitted by Launch Point:
        </TextDetail>
        <TextDetail level="body1">
          <ul>
            <li>
              You are not permitted to reproduce, modify, sell, publish,
              transmit and distribute or commercially exploit any information
              available to you on the Site, in whole or in part, in any format
              to or for any third party, without prior written permission of
              Launch Point and/or the relevant affiliate(s) of Launch Point;
            </li>
            <li>
              You shall not use any information on the Site for any unlawful or
              unauthorised purposes;
            </li>
            <li>
              You shall at all times exercise your own judgment in the use of
              the Site or the Services;
            </li>
            <li>
              All information and materials available on the Site are prepared
              and provided for informational purposes only without regard to any
              particular user’s investment objectives, financial situation or
              means, and such information and materials are not to be construed
              as a recommendation of Launch Point or any of its affiliates, or
              an offer or an attempt to offer to buy or sell, or the
              solicitation of an offer to buy or sell, any security, financial
              project, or instrument, or to participate in any particular
              trading strategy or investment scheme in any jurisdiction in which
              such an offer, attempt to offer or solicitation, or trading
              strategy, or investment scheme, would be illegal;
            </li>
            <li>
              The Services available to you through the Site constitute neither
              a recommendation to enter into any particular transaction nor a
              representation that any service, product or investment described
              on the Site is suitable or appropriate for you;
            </li>
            <li>
              Certain transactions, including, but not limited to, those
              involving futures, options, and other complex products or
              derivatives, give rise to substantial risk and are not suitable
              for all investors;
            </li>
            <li>
              You should not enter into any particular transaction(s) unless you
              have fully understood all such risks and have independently
              determined that such transaction(s) are appropriate for you; Any
              discussion of the risks contained herein shall not be considered
              to be a complete or comprehensive disclosure of all risks; and
            </li>
            <li>
              You shall not construe any of the information or material
              contained in the Site as business, financial, investment, hedging,
              trading, legal, regulatory, tax or accounting advice.
            </li>
          </ul>
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Privacy
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          When you provide personal data or information to us, we will comply
          with our &lt;Privacy Policy&gt;. By accessing or using our Site or
          Services you are deemed to have agreed to our Privacy Policy (as may
          be amended from time to time).
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Disclaimers, Limits of Liability, and Indemnities
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          The Services and the information available on the Site are provided on
          an “as-is” basis and on an as available basis. All use of the Site is
          at your own risk.
        </TextDetail>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          To the extent permitted by law:
        </TextDetail>
        <TextDetail level="body1">
          <ul>
            <li>
              Launch Point makes no warranties, representations and guarantees
              (whether express or implied) as to the accuracy, correctness,
              quality or reliability of the information or materials available
              on the Site, or the security of the Site, or the security of using
              the Services through the Site. By using the Site or the Services,
              you agree that errors, inadequacy and/or omissions contained in
              such information and/or materials, or interruptions in the
              delivery of any data or services available on the Site, or failure
              or delay in the execution of any transaction(s) through the Site,
              shall not be made the basis for any claim, demand or cause of
              action against Launch Point;
            </li>
            <li>
              Third party providers shall have no liability to you for monetary
              damages on account of any of their information or materials
              provided to you via the Site;
            </li>
            <li>
              Launch Point expressly disclaims all warranties, representations,
              guarantees and liabilities, including without limitation all
              implied warranties, representations and guarantees related to
              merchantability or fitness for a particular purpose, accuracy,
              completeness, reliability, usability, security, quality,
              performance, availability (or continued availability), or
              timeliness of the Site, its content or the content of any website
              linked to or from this Site;
            </li>
            <li>
              Neither Launch Point nor any third party providers shall have any
              responsibility to maintain the data, information and materials
              available on the Site or to supply any corrections, updates or
              releases in connection therewith. Availability of the data,
              information and materials on the Site is subject to change without
              notice;
            </li>
            <li>
              Launch Point shall have no liability, contingent or otherwise, to
              you or to any other person, or any responsibility whatsoever, for
              the failure of any connection or communication to provide or
              maintain your access to this Site or the Services, or for any
              interruption or disruption of such access or any erroneous
              communication between you and Launch Point, regardless of whether
              the connection or communication is provided by Launch Point or any
              of its third party service providers;
            </li>
            <li>
              Launch Point and its employees, officers, agents and contractors
              shall, to the extent permitted by law, not be liable to you or any
              other person for any losses, expenses, claims or costs whatsoever
              (including without limitation any loss of profits, revenue or
              data, incidental, consequential, exemplary, special, or indirect
              damages or other intangible damages) arising out of or in
              connection with these Terms or resulting from the use or the
              inability to use any information available on or downloaded from
              this Site, or your use of or access to (or inability to use or
              access) this Site or the Services, even if Launch Point or any of
              its affiliates has been advised of the possibility of such
              damages. This exclusion or limitation of liability applies
              regardless of whether such liability arises in contract, tort
              (including negligence), equity, breach of statutory duty or
              otherwise; and
            </li>
            <li>
              To the extent that certain liability(ies) may not be excluded,
              limited or disclaimed under applicable law, Launch Point shall
              only be liable for direct loss or damages actually incurred by you
              not exceeding HK$500 as a result of your use of our Services
              through the Site.
            </li>
          </ul>
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Indemnity
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          You will indemnify and hold harmless Launch Point and its employees,
          officers, agents and contractors from and against (without limitation)
          any and all losses, expenses, claims or costs (including out of pocket
          expenses and charges for our time), arising out of or related to your
          breach of these Terms or any applicable laws or the rights of any
          third party.
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Third party information and links
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          The Site contains information provided by other person(s) and may
          include link(s) to other website(s). The inclusion of any such
          information or link(s) does not imply our endorsement, approval or
          recommendation of such information or link(s) or its related products
          or services. Launch Point shall not be responsible for any contents,
          statements, operations, products and/or services disclosed in such
          link(s) or website(s) or provided by such other person(s) through our
          Site. We take no responsibility for any damage or harm arising out of
          your use or reliance of such third party information or link(s).
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Reliance on information
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          No part of this Site is intended to constitute advice by us. We are
          not liable or responsible for any reliance placed on this Site, and
          the contents of this Site, by you or anyone who you may inform of its
          contents. We make no guarantee of any specific results from the use of
          this Site. Where you take any decision, or enter into any agreement
          with any other person, as a result of your use of this Site, you
          acknowledge that you do so having independently made all such
          investigations and taken all such professional advice as may be
          necessary to enable you to make an informed and independent decision.
          You agree to comply with any such agreement and with any relevant laws
          that apply to that agreement.
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Viruses, hacking and other offences
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          Conducting any illegal activities or any other activities that may
          constitute an offence under any applicable law is strictly prohibited.
          You agree that you will not engage in any activities related to this
          Site that are contrary to applicable laws and regulations. While
          Launch Point will use its best endeavor to protect the Site from
          viruses attack or hacking, Launch Point will not be liable or have any
          responsibility of any kind for any loss or damage that you may incur
          in the event of the transmission of any viruses which may infect a
          user’s equipment, or any unauthorized access to the Site or Services,
          computer systems or networks connected to such Site or Services
          through hacking, password mining or any other means.
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Intellectual property
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          We (and our intellectual property licensor(s)) own all proprietary and
          intellectual property rights in:
        </TextDetail>

        <TextDetail level="body1">
          <ul>
            <li>
              this Site, including (without limitation) all text, graphics,
              brands, logos, icons, sound or image recordings, and its look and
              feel, the underlying software, system and network, and any other
              material forming part of this Site; and any copy, development,
              adaptation, or customisation of, or modification to, the items
              listed above.
            </li>
            <li>
              Except to the extent expressly permitted by these Terms or by law,
              you must not copy, adapt, store, distribute, display, publish,
              reproduce or create derivative works from any part of this Site,
              nor decompile or reverse engineer any underlying software, system
              or network.
            </li>
            <li>
              Launch Point and its intellectual property licensor(s) reserve all
              rights to such proprietary information (including, but not limited
              to, all intellectual property rights) in all forms, whether or not
              registered or capable of registration under applicable laws, and
              any other rights relating to intellectual property, subsisting in
              or relating to the Site or the Services.
            </li>
          </ul>
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          No waiver
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          If we do not exercise or enforce any rights available to us under
          these Terms, it does not constitute a waiver or we shall not be deemed
          to have given a waiver of any of those rights. A waiver of any such
          rights must be given by us in writing.
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Illegality/Severability
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          If any part or provision of these Terms is invalid, illegal,
          unenforceable or in conflict with the law, that part or provision is
          replaced with a provision which, as far as possible, accomplishes the
          original purpose of that part or provision. That replacement term and
          the remainder of these Terms will be binding on you.
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Jurisdiction
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          These Terms are governed by and construed in accordance with the laws
          of the Hong Kong SAR and any dispute or claims arising from these
          Terms shall be subject to the exclusive jurisdiction of the courts of
          Hong Kong SAR.
        </TextDetail>

        <Typography
          level="h5"
          sx={{
            marginTop: "20px",
          }}
        >
          Amendments
        </Typography>

        <TextDetail
          level="body1"
          sx={{
            marginTop: "20px",
          }}
        >
          Launch Point reserves the right to amend these Terms at any time
          without notice. Such changes or updates will be published online and
          will be effective immediately upon posting. You should review these
          Terms periodically to ensure that you are familiar with the latest
          Terms. Your continued use of this Site or the Services following any
          amendment to these Terms shall constitute your acceptance to the
          Terms, as amended. If you (or any person(s) represented by you) do not
          agree to such amendment(s), you must forthwith notify Launch Point in
          writing of your refusal and discontinue of your use of the Site or the
          Services.
        </TextDetail>
      </CardContent>
    </Card>
  </Box>
);

export default TermsAndConditions;
