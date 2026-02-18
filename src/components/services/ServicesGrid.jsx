import Link from "next/link";
import servicesData from "@/data/services.json";
import Card from "@/components/UI/Card";
import RevealWrapper from "@/components/UI/RevealWrapper";
import ServicesBackground from "@/components/backgroundAnimation/ServicesBackground";
import "./style/ServicesGrid.css";

export default function ServicesGrid() {
    const { tabs } = servicesData;

    return (
        <>
            <ServicesBackground />
            <section className="services-grid">
                <div className="services-grid-container">
                    {/* Header */}
                    <div className="services-grid-header">
                        <RevealWrapper direction="up">
                            <span className="services-eyebrow">Services</span>
                        </RevealWrapper>
                        <RevealWrapper direction="up" delay={120}>
                            <h1 className="services-grid-title">
                                Comprehensive Digital Solutions
                            </h1>
                        </RevealWrapper>
                        <RevealWrapper direction="up" delay={240}>
                            <p className="services-grid-intro">
                                From strategic planning to creative execution, we provide end-to-end
                                digital services designed to help your brand grow and succeed in the
                                modern landscape.
                            </p>
                        </RevealWrapper>
                    </div>

                    {/* Grid */}
                    <div className="services-grid-cards">

                        {tabs.map((service) => (

                            <Card
                                key={service.id}
                                variant="red-accent"
                                href={`/services/${service.id}`}
                                className="services-grid-card"
                            >
                                <div>
                                    <RevealWrapper direction="up" delay={240}>
                                        <h3 className="card-title">{service.label}</h3>
                                    </RevealWrapper>
                                    <RevealWrapper direction="up" delay={240}>
                                        <p className="card-description">
                                            {service.description}
                                        </p>
                                    </RevealWrapper>
                                </div>
                                <span className="card-link">Know more →</span>
                            </Card>

                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
