import React from "react";
import useDocumentTitle from "../../useDocumentTitle";


const LegalNotice = function () {
    useDocumentTitle("Mentions légales");
    return <div className="content">
        <div className={"grid2"}>
            <div>
                <h3>Propriétaire du site :</h3>
                <p>Heban SIMON</p>
                <p>Email : <a href="mailto:contact@silvain.eu">contact@ferenost.fr</a></p>
                <p>&nbsp;</p>
                <p>Ludwig SILVAIN</p>
                <p>Email : <a href="mailto:contact@silvain.eu">contact@silvain.eu</a></p>
            </div>

            <div>
                <h3>Hébergeur du site: <strong>OVH</strong></h3>
                <div>
                    <p>2 rue Kellermann</p>
                    <p>59100 Roubaix - France</p>
                    <p>Société par actions simplifiée</p>
                    <p>Siret :  424 761 419 00045</p>
                </div>
                <div className="mt-3">
                    <p>Site: <a href="https://www.ovhcloud.com" target="_blank"
                                rel="noreferrer">www.ovhcloud.com</a></p>
                </div>
            </div>
        </div>
    </div>
}

export default LegalNotice;