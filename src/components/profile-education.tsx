import { profile } from "@/data/profile";

export function ProfileEducation() {
  return (
    <section className="profile-education" data-reveal aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      <div className="education-groups">
        {profile.education.map(({ level, period, entries }) => (
          <div className="education-group" key={level}>
            <h3>
              <span>{level}</span>
              <span className="education-period">{period}</span>
            </h3>
            <ul className="education-entries">
              {entries.map(({ program, school }) => (
                <li key={school}>
                  <h4>{program}</h4>
                  <p className="education-school">{school}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
