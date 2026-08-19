import useReveal from '../../hooks/useReveal'
import './Skills.css'

const GROUPS = [
  {
    label: 'Languages',
    text: 'Java (8/11/17), TypeScript, JavaScript, SQL, PL/SQL, HTML/CSS',
  },
  {
    label: 'Backend',
    text: 'Spring Boot, Spring MVC, Spring Security, Hibernate, JPA, Node.js, Microservices, REST & SOAP APIs, GraphQL',
  },
  {
    label: 'Frontend',
    text: 'React, Redux, Angular, RxJS, NgRx, Material UI, Bootstrap',
  },
  {
    label: 'Messaging & Caching',
    text: 'Apache Kafka, RabbitMQ, ActiveMQ, JMS, Redis',
  },
  {
    label: 'Cloud & DevOps',
    text: 'AWS (EC2, S3, Lambda, DynamoDB, Glue, EKS, API Gateway), Docker, Kubernetes, OpenShift, Jenkins, Terraform, CI/CD',
  },
  {
    label: 'Databases & Testing',
    text: 'Oracle, PostgreSQL, MySQL, MongoDB, DynamoDB, Cassandra · JUnit, Mockito, Rest Assured, Selenium, Jest',
  },
]

function SkillGroup({ group }) {
  const ref = useReveal()
  return (
    <li ref={ref} className="reveal skill-group">
      <p className="skill-group__label">{group.label}</p>
      <p className="skill-group__items">{group.text}</p>
    </li>
  )
}

export default function Skills() {
  const headingRef = useReveal()

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div ref={headingRef} className="reveal">
          <p className="eyebrow">Skills</p>
        </div>
        <ul className="skill-grid">
          {GROUPS.map((group) => (
            <SkillGroup key={group.label} group={group} />
          ))}
        </ul>
      </div>
    </section>
  )
}
