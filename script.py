# Let me analyze the resume content and extract key information for the portfolio update
resume_info = {
    "name": "Anuj Dwivedi",
    "email": "anujdwivedi.sae.comp@gmail.com", 
    "phone": "9560410919",
    "linkedin": "www.linkedin.com/in/anujdwivedi502",
    "location": "Greater Noida, Uttar Pradesh, India",
    "current_role": "Deputy Manager - IT",
    "company": "Axis Bank",
    "education": {
        "degree": "B.E in Computer Science",
        "university": "Savitribai Phule Pune University",
        "cgpa": "8.41/10",
        "years": "2019 - 2023"
    },
    "professional_summary": "Results-driven IT professional with a B.E. in Computer Science and extensive experience in database management, disaster recovery, and automation. Former Deputy Manager (IT) at Axis Bank, now transitioning into AI/ML roles with a strong foundation in database monitoring, performance optimization, and system integrity.",
    "skills": [
        "MySQL", "Oracle RAC", "PostgreSQL", "MongoDB", "DRM Tool Management",
        "Database Performance Tuning", "Patch Management", "High Availability",
        "RTO Optimization", "Java", "Python", "Kotlin", "CNN", "GAN",
        "Image Processing", "OCR", "Deep Learning", "Android Studio",
        "REST APIs", "AWS", "Machine Learning"
    ],
    "experience": [
        {
            "role": "Deputy Manager - IT",
            "company": "Axis Bank",
            "period": "Aug 2023 - Present",
            "location": "Mumbai",
            "description": "Working in Disaster Recovery, managing monitoring of databases for 400+ applications, improving efficiency from 28% to 97%"
        },
        {
            "role": "Software Engineer Associate(Trainee)",
            "company": "Amdocs",
            "period": "Feb 2023 - Aug 2023",
            "location": "Pune"
        },
        {
            "role": "Software Trainee", 
            "company": "Persistent Systems",
            "period": "Jun 2022 - Aug 2022",
            "location": "Pune"
        }
    ],
    "projects": [
        {
            "title": "Database Monitoring and DRM Tool Management",
            "description": "Managed and monitored a database for over 400 applications, achieving a monitoring efficiency of 97%",
            "technologies": ["Database Management", "DRM Tool", "Oracle RAC", "MySQL"]
        },
        {
            "title": "Onboarding on DRM Tool",
            "description": "Led the on-boarding of applications onto DRM tool for automated Disaster Recovery activities, achieving RTO of 2-5 minutes",
            "technologies": ["Disaster Recovery", "Automation", "RBI Compliance"]
        },
        {
            "title": "Enhancement of DRM Tool Functionality for MySQL Database Support",
            "description": "Implemented critical enhancement to DRM tool, enabling comprehensive disaster recovery capabilities for MySQL databases across 30+ applications",
            "technologies": ["MySQL", "DRM Tool", "Database Integration"]
        },
        {
            "title": "Image Restoration",
            "description": "Developed a CNN-based Machine Learning application that restores damaged and corrupted images",
            "technologies": ["Machine Learning", "Python", "CNN", "GAN", "Image Processing"]
        },
        {
            "title": "Optical Character Recognition App",
            "description": "Developed an optical character recognition software using Machine Learning",
            "technologies": ["Machine Learning", "Android Studio", "Kotlin", "OCR"]
        }
    ],
    "awards": [
        "BEST PAPER OF SESSION by National Conference on Multidisciplinary Research",
        "All India Rank 10 in IoT in Machine Learning contest",
        "3rd Position in Microsoft Power Apps Hackathon"
    ]
}

print("Resume information extracted successfully:")
for key, value in resume_info.items():
    if key not in ["experience", "projects"]:
        print(f"{key}: {value}")

print(f"\nNumber of projects: {len(resume_info['projects'])}")
print(f"Number of work experiences: {len(resume_info['experience'])}")
print(f"Number of awards: {len(resume_info['awards'])}")