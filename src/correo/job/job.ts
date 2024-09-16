import cron from 'node-cron';
import { CaseModel } from '../../data/models/caso.model';
import { EmailService } from '../servicio/service';
import { CaseDataSource } from '../dataSource/dataSource';
import { generateIncidentEmailTemplate } from '../template/templateCorreo';


export const emailJob = () => {
    const emailService = new EmailService();
    const caseDataSource = new CaseDataSource();
    cron.schedule('*/10 * * * * *', async () => {
        console.log('Corriendo cada 10 segundos');

        try {
            const cases = await CaseModel.find({isSent: false});
            if (!cases.length) {
                console.log("No hay casos pendientes de enviar");
                return;
            };

            console.log(`Procesando ${cases.length} casos`);

            await Promise.all(
                cases.map(async (caso) => {
                    const htmlBody = generateIncidentEmailTemplate(
                        caso.genre, caso.age, caso.latitude, caso.longitude, caso.creationDate
                    );
                    await emailService.sendEmail({
                        to: "romeroerubey4@gmail.com",
                        subject: `Caso: ${caso.genre}`,
                        htmlBody: htmlBody
                    });
                    console.log(`Correo enviado para el incidente con ID: ${caso._id}`);
                    await caseDataSource.updateIncident(caso._id.toString(), {...caso, isSent: true});
                    console.log(`Case with ID: ${caso._id} updated`);

            }));

        } catch (error) {
            console.log(error, "Error durante el trabajo de envio de correos");
        }
    });
}