// Application State
const AppState = {
    currentCategory: null,
    evaluationData: {},
    isLoading: false
};

// Evaluation Forms Data with Preset Sentences
const evaluationForms = {
    "schülerhandeln": {
        "title": "Dimension Schülerhandeln",
        "categories": [
            {
                "name": "Engagement und Beteiligung",
                "description": "Die Lernenden beteiligen sich engagiert am Unterricht",
                "preset_sentences": [
                    {
                        "text": "Die SuS arbeiten aktiv und motiviert im Unterricht mit",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS bringen eigene Überlegungen und Erfahrungen konstruktiv ein",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS übernehmen Arbeitsaufträge zügig und selbstständig",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS suchen bei Schwierigkeiten angemessen Unterstützung",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS setzen sich kritisch mit Themen und Problemstellungen auseinander",
                        "type": "positive"
                    },
                    {
                        "text": "Das Engagement der SuS ist nur teilweise erkennbar",
                        "type": "neutral"
                    },
                    {
                        "text": "Die SuS benötigen häufige Ermutigung zur Mitarbeit",
                        "type": "development"
                    },
                    {
                        "text": "Die SuS zeigen wenig Eigeninitiative bei der Aufgabenbearbeitung",
                        "type": "development"
                    }
                ]
            },
            {
                "name": "Klassenklima",
                "description": "Die Lernenden begegnen einander und der Lehrkraft mit Wertschätzung und Respekt",
                "preset_sentences": [
                    {
                        "text": "Die SuS halten sich vorbildlich an vereinbarte Regeln und Rituale",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS sprechen durchweg respektvoll und höflich miteinander",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS lassen andere ausreden und akzeptieren unterschiedliche Meinungen",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS nehmen aufeinander Rücksicht und stellen andere nicht bloß",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS kooperieren konstruktiv und arbeiten gut zusammen",
                        "type": "positive"
                    },
                    {
                        "text": "Das Klassenklima ist größtenteils positiv und wertschätzend",
                        "type": "neutral"
                    },
                    {
                        "text": "Es gibt gelegentliche Störungen des respektvollen Umgangs",
                        "type": "development"
                    },
                    {
                        "text": "Das Klassenklima bedarf noch der Entwicklung",
                        "type": "development"
                    }
                ]
            },
            {
                "name": "Kompetenzentwicklung",
                "description": "Die Lernenden zeigen bei der Bearbeitung der Aufgaben einen Lernfortschritt",
                "preset_sentences": [
                    {
                        "text": "Die SuS bewältigen Arbeitsaufträge aus verschiedenen Anforderungsbereichen erfolgreich",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS wenden fachspezifische und überfachliche Methoden sicher an",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS stellen ihre Lösungen nachvollziehbar und strukturiert dar",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS setzen sich inhaltlich mit den Beiträgen anderer auseinander",
                        "type": "positive"
                    },
                    {
                        "text": "Die SuS reflektieren ihren Lernprozess und Lernfortschritt bewusst",
                        "type": "positive"
                    },
                    {
                        "text": "Die Kompetenzentwicklung ist bei den meisten SuS erkennbar",
                        "type": "neutral"
                    },
                    {
                        "text": "Einzelne SuS zeigen noch Schwierigkeiten bei der Umsetzung",
                        "type": "development"
                    },
                    {
                        "text": "Die Kompetenzentwicklung benötigt weitere Förderung",
                        "type": "development"
                    }
                ]
            }
        ]
    },
    "lehrerhandeln": {
        "title": "Dimension Lehrerhandeln",
        "categories": [
            {
                "name": "Konstruktive Unterstützung",
                "description": "Die Lehrkraft unterstützt die Lernenden in ihrem Lernprozess",
                "preset_sentences": [
                    {
                        "text": "L. fordert die Mitwirkung und Eigenverantwortung aller SuS konsequent ein",
                        "type": "positive"
                    },
                    {
                        "text": "L. gibt adaptive Hilfestellungen zum Erreichen der Lernziele",
                        "type": "positive"
                    },
                    {
                        "text": "L. unterstützt die SuS durch lernwirksames und differenziertes Feedback",
                        "type": "positive"
                    },
                    {
                        "text": "L. pflegt einen konstruktiven Umgang mit Fehlern als Lernchancen",
                        "type": "positive"
                    },
                    {
                        "text": "L. begleitet den Lernfortschritt durch formatives Assessment",
                        "type": "positive"
                    },
                    {
                        "text": "L. zeigt grundsätzlich unterstützendes Verhalten",
                        "type": "neutral"
                    },
                    {
                        "text": "L. könnte die Unterstützung noch individueller gestalten",
                        "type": "development"
                    },
                    {
                        "text": "L. sollte mehr auf die Bedürfnisse einzelner SuS eingehen",
                        "type": "development"
                    }
                ]
            },
            {
                "name": "Klassenführung",
                "description": "Die Lehrkraft führt die Klasse pädagogisch adäquat",
                "preset_sentences": [
                    {
                        "text": "L. pflegt eine freundliche und respektvolle Beziehung zur Klasse",
                        "type": "positive"
                    },
                    {
                        "text": "L. hat alle Lernenden im Blick und reagiert aufmerksam",
                        "type": "positive"
                    },
                    {
                        "text": "L. sorgt für die Einhaltung von Regeln und Sicherheitsstandards",
                        "type": "positive"
                    },
                    {
                        "text": "L. reagiert frühzeitig und angemessen auf Störungen",
                        "type": "positive"
                    },
                    {
                        "text": "L. nutzt die Unterrichtszeit effizient und strukturiert",
                        "type": "positive"
                    },
                    {
                        "text": "L. führt die Klasse sicher und kompetent",
                        "type": "neutral"
                    },
                    {
                        "text": "L. könnte bei der Klassenführung noch konsequenter sein",
                        "type": "development"
                    },
                    {
                        "text": "L. sollte präventive Maßnahmen zur Klassenführung verstärken",
                        "type": "development"
                    }
                ]
            },
            {
                "name": "Ziel- und Kompetenzorientierung",
                "description": "Die Lehrkraft fokussiert die angestrebten Lernziele und Kompetenzen",
                "preset_sentences": [
                    {
                        "text": "L. baut die Unterrichtsschritte stimmig und strukturiert aufeinander auf",
                        "type": "positive"
                    },
                    {
                        "text": "L. macht transparent, was die SuS leisten und erarbeiten sollen",
                        "type": "positive"
                    },
                    {
                        "text": "L. achtet darauf, dass Ergebnisse lernzielorientiert gesichert werden",
                        "type": "positive"
                    },
                    {
                        "text": "L. integriert Konsolidierung und intelligentes Üben systematisch",
                        "type": "positive"
                    },
                    {
                        "text": "L. initiiert die Reflexion der Lernergebnisse zielgerichtet",
                        "type": "positive"
                    },
                    {
                        "text": "L. orientiert sich grundsätzlich an den Lernzielen",
                        "type": "neutral"
                    },
                    {
                        "text": "L. könnte die Zielorientierung noch expliziter machen",
                        "type": "development"
                    },
                    {
                        "text": "L. sollte die Kompetenzorientierung stärker betonen",
                        "type": "development"
                    }
                ]
            }
        ]
    },
    "lernangebot": {
        "title": "Dimension Lernangebot",
        "categories": [
            {
                "name": "Ziele und Inhalte",
                "description": "Die Lernziele sind angemessen und die Inhalte werden fachlich korrekt vermittelt",
                "preset_sentences": [
                    {
                        "text": "Die Ziele fördern fachliche und überfachliche Kompetenzen optimal",
                        "type": "positive"
                    },
                    {
                        "text": "Die Inhalte sind bildungsplankonform und fachdidaktisch fundiert",
                        "type": "positive"
                    },
                    {
                        "text": "Die Inhalte nehmen deutlichen Bezug zur Lebenswelt der SuS",
                        "type": "positive"
                    },
                    {
                        "text": "Die Inhalte werden fachlich korrekt und sprachlich angemessen vermittelt",
                        "type": "positive"
                    },
                    {
                        "text": "Die Aufgaben ermöglichen individuellen Lernzuwachs für alle SuS",
                        "type": "positive"
                    },
                    {
                        "text": "Ziele und Inhalte sind grundsätzlich angemessen gewählt",
                        "type": "neutral"
                    },
                    {
                        "text": "Die Inhalte könnten noch stärker an die SuS angepasst werden",
                        "type": "development"
                    },
                    {
                        "text": "Die fachliche Korrektheit sollte an einzelnen Stellen überprüft werden",
                        "type": "development"
                    }
                ]
            },
            {
                "name": "Differenzierung",
                "description": "Das Lernangebot berücksichtigt die Heterogenität der Lerngruppe",
                "preset_sentences": [
                    {
                        "text": "Das Lernangebot knüpft optimal an die Lernvoraussetzungen an",
                        "type": "positive"
                    },
                    {
                        "text": "Das Lernangebot berücksichtigt individuelles Können und Lernverhalten",
                        "type": "positive"
                    },
                    {
                        "text": "Binnendifferenzierung wird didaktisch reflektiert angeboten",
                        "type": "positive"
                    },
                    {
                        "text": "Das Lernangebot ist sprachsensibel gestaltet mit gezielten Hilfen",
                        "type": "positive"
                    },
                    {
                        "text": "Analoge/digitale Lernhilfen stehen individuell zur Verfügung",
                        "type": "positive"
                    },
                    {
                        "text": "Die Differenzierung ist grundsätzlich erkennbar",
                        "type": "neutral"
                    },
                    {
                        "text": "Die Differenzierung könnte noch ausgeprägter sein",
                        "type": "development"
                    },
                    {
                        "text": "Weitere Differenzierungsmaßnahmen wären förderlich",
                        "type": "development"
                    }
                ]
            },
            {
                "name": "Kognitive Aktivierung",
                "description": "Das Lernangebot fordert die Lernenden kognitiv heraus",
                "preset_sentences": [
                    {
                        "text": "Die Lernsituation ist problemorientiert und angemessen komplex",
                        "type": "positive"
                    },
                    {
                        "text": "Die Lernsituation ermutigt zu eigenen Ideen und Lösungswegen",
                        "type": "positive"
                    },
                    {
                        "text": "Aufgaben fördern vertieftes Nachdenken und Verstehen optimal",
                        "type": "positive"
                    },
                    {
                        "text": "Das methodische Arrangement ermöglicht produktive Auseinandersetzung",
                        "type": "positive"
                    },
                    {
                        "text": "Medien werden funktional und lernförderlich eingesetzt",
                        "type": "positive"
                    },
                    {
                        "text": "Die kognitive Aktivierung ist grundsätzlich gegeben",
                        "type": "neutral"
                    },
                    {
                        "text": "Die kognitive Herausforderung könnte noch gesteigert werden",
                        "type": "development"
                    },
                    {
                        "text": "Weitere aktivierende Elemente wären wünschenswert",
                        "type": "development"
                    }
                ]
            }
        ]
    }
};

// Perplexity API configuration
const PERPLEXITY_API_KEY = "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";
const PERPLEXITY_ENDPOINT = "https://api.perplexity.ai/chat/completions";

// DOM Elements
const dashboard = document.getElementById('dashboard');
const evaluationFormSection = document.getElementById('evaluation-form');
const backBtn = document.getElementById('back-btn');
const formTitle = document.getElementById('form-title');
const formDescription = document.getElementById('form-description');
const formCategories = document.getElementById('form-categories');
const aiAnalysisBtn = document.getElementById('ai-analysis-btn');
const generatePdfBtn = document.getElementById('generate-pdf-btn');
const aiModal = document.getElementById('ai-modal');
const closeModal = document.getElementById('close-modal');
const closeAiModal = document.getElementById('close-ai-modal');
const aiLoading = document.getElementById('ai-loading');
const aiResponse = document.getElementById('ai-response');
const toastContainer = document.getElementById('toast-container');

// Quick action buttons
const selectAllPositiveBtn = document.getElementById('select-all-positive');
const selectAllNeutralBtn = document.getElementById('select-all-neutral');
const clearAllBtn = document.getElementById('clear-all');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Add event listeners for category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showEvaluationForm(category);
        });
    });

    // Back button event listener
    backBtn.addEventListener('click', showDashboard);

    // AI Analysis button
    aiAnalysisBtn.addEventListener('click', requestAIAnalysis);

    // PDF Generation button
    generatePdfBtn.addEventListener('click', generatePDF);

    // Modal close buttons
    closeModal.addEventListener('click', closeAIModal);
    closeAiModal.addEventListener('click', closeAIModal);

    // Close modal on backdrop click
    aiModal.addEventListener('click', function(e) {
        if (e.target === aiModal) {
            closeAIModal();
        }
    });

    // Quick action buttons
    selectAllPositiveBtn.addEventListener('click', () => selectByType('positive'));
    selectAllNeutralBtn.addEventListener('click', () => selectByType('neutral'));
    clearAllBtn.addEventListener('click', clearAllSelections);
}

function showEvaluationForm(category) {
    AppState.currentCategory = category;
    const formData = evaluationForms[category];
    
    if (!formData) {
        showToast('Kategorie nicht gefunden', 'error');
        return;
    }

    // Update form title and description
    formTitle.textContent = formData.title;
    formDescription.textContent = `Bewertung mit vorgefertigten Bewertungssätzen`;

    // Clear and populate form categories
    formCategories.innerHTML = '';
    
    formData.categories.forEach((categoryData, categoryIndex) => {
        const categoryElement = createCategoryElement(categoryData, categoryIndex);
        formCategories.appendChild(categoryElement);
    });

    // Show form and hide dashboard
    dashboard.classList.add('hidden');
    evaluationFormSection.classList.remove('hidden');

    // Scroll to top
    window.scrollTo(0, 0);
}

function createCategoryElement(categoryData, categoryIndex) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'form-category';
    
    const categoryId = `category-${categoryIndex}`;
    
    categoryDiv.innerHTML = `
        <div class="category-header" data-category="${categoryIndex}">
            <h3>
                ${categoryData.name}
                <span class="category-toggle">▼</span>
            </h3>
            <div class="category-description">${categoryData.description}</div>
        </div>
        <div class="category-content" id="${categoryId}">
            <div class="checkbox-group" id="checkbox-group-${categoryIndex}"></div>
            <div class="custom-notes">
                <label class="custom-notes-label" for="notes-${categoryIndex}">
                    Eigene Beobachtungen zu "${categoryData.name}"
                </label>
                <textarea 
                    class="custom-notes-input" 
                    id="notes-${categoryIndex}"
                    placeholder="Zusätzliche Notizen und Beobachtungen..."
                    rows="3"
                ></textarea>
            </div>
        </div>
    `;

    // Add accordion functionality
    const header = categoryDiv.querySelector('.category-header');
    const content = categoryDiv.querySelector('.category-content');
    
    header.addEventListener('click', function() {
        const isExpanded = content.classList.contains('expanded');
        
        if (isExpanded) {
            content.classList.remove('expanded');
            header.classList.remove('expanded');
        } else {
            content.classList.add('expanded');
            header.classList.add('expanded');
        }
    });

    // Create checkbox groups
    const checkboxGroup = categoryDiv.querySelector(`#checkbox-group-${categoryIndex}`);
    createCheckboxGroups(checkboxGroup, categoryData.preset_sentences, categoryIndex);

    return categoryDiv;
}

function createCheckboxGroups(container, sentences, categoryIndex) {
    const groupedSentences = {
        positive: sentences.filter(s => s.type === 'positive'),
        neutral: sentences.filter(s => s.type === 'neutral'),
        development: sentences.filter(s => s.type === 'development')
    };

    const groupTitles = {
        positive: '✓ Positive Bewertungen',
        neutral: '≈ Neutrale Bewertungen',
        development: '⚠ Entwicklungsfelder'
    };

    Object.entries(groupedSentences).forEach(([type, sentences]) => {
        if (sentences.length === 0) return;

        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'checkbox-section';
        
        const titleDiv = document.createElement('div');
        titleDiv.className = `checkbox-section-title ${type}`;
        titleDiv.textContent = groupTitles[type];
        sectionDiv.appendChild(titleDiv);

        sentences.forEach((sentence, sentenceIndex) => {
            const checkboxId = `checkbox-${categoryIndex}-${type}-${sentenceIndex}`;
            
            const checkboxItem = document.createElement('div');
            checkboxItem.className = `checkbox-item ${type}`;
            
            checkboxItem.innerHTML = `
                <input 
                    type="checkbox" 
                    class="checkbox-input" 
                    id="${checkboxId}"
                    data-category="${categoryIndex}"
                    data-type="${type}"
                    data-sentence="${sentence.text}"
                >
                <label class="checkbox-label" for="${checkboxId}">
                    ${sentence.text}
                </label>
            `;

            // Add change event listener
            const checkbox = checkboxItem.querySelector('.checkbox-input');
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    checkboxItem.classList.add('checked');
                } else {
                    checkboxItem.classList.remove('checked');
                }
            });

            sectionDiv.appendChild(checkboxItem);
        });

        container.appendChild(sectionDiv);
    });
}

function selectByType(type) {
    const checkboxes = document.querySelectorAll(`.checkbox-input[data-type="${type}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        checkbox.closest('.checkbox-item').classList.add('checked');
    });
    
    const typeNames = {
        positive: 'positive',
        neutral: 'neutrale',
        development: 'Entwicklungs-'
    };
    
    showToast(`Alle ${typeNames[type]} Bewertungen ausgewählt`, 'success');
}

function clearAllSelections() {
    const checkboxes = document.querySelectorAll('.checkbox-input');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.checkbox-item').classList.remove('checked');
    });
    
    showToast('Alle Auswahlen gelöscht', 'info');
}

function showDashboard() {
    dashboard.classList.remove('hidden');
    evaluationFormSection.classList.add('hidden');
    AppState.currentCategory = null;
}

function collectFormData() {
    const data = {
        category: AppState.currentCategory,
        title: evaluationForms[AppState.currentCategory]?.title || '',
        categories: {},
        additionalNotes: document.getElementById('additional-notes').value.trim()
    };

    // Collect data from each category
    const formData = evaluationForms[AppState.currentCategory];
    if (formData) {
        formData.categories.forEach((categoryData, categoryIndex) => {
            const categoryName = categoryData.name;
            data.categories[categoryName] = {
                description: categoryData.description,
                selectedSentences: [],
                customNotes: ''
            };

            // Collect selected checkboxes
            const checkboxes = document.querySelectorAll(`input[data-category="${categoryIndex}"]`);
            checkboxes.forEach(checkbox => {
                if (checkbox.checked && checkbox.hasAttribute('data-sentence')) {
                    data.categories[categoryName].selectedSentences.push({
                        text: checkbox.getAttribute('data-sentence'),
                        type: checkbox.getAttribute('data-type')
                    });
                }
            });

            // Collect custom notes
            const notesTextarea = document.getElementById(`notes-${categoryIndex}`);
            if (notesTextarea) {
                data.categories[categoryName].customNotes = notesTextarea.value.trim();
            }
        });
    }

    return data;
}

async function requestAIAnalysis() {
    const formData = collectFormData();
    
    // Check if there's any data to analyze
    const hasData = Object.values(formData.categories).some(category => 
        category.selectedSentences.length > 0 || category.customNotes
    ) || formData.additionalNotes;

    if (!hasData) {
        showToast('Bitte wählen Sie zuerst einige Bewertungen aus oder fügen Sie Notizen hinzu', 'warning');
        return;
    }

    // Show modal and loading state
    aiModal.classList.remove('hidden');
    aiLoading.classList.remove('hidden');
    aiResponse.classList.add('hidden');

    try {
        const prompt = createAnalysisPrompt(formData);
        const response = await callPerplexityAPI(prompt);
        
        // Hide loading and show response
        aiLoading.classList.add('hidden');
        aiResponse.classList.remove('hidden');
        aiResponse.innerHTML = formatAIResponse(response);
        
        showToast('KI-Analyse erfolgreich erstellt', 'success');
    } catch (error) {
        console.error('AI Analysis Error:', error);
        aiLoading.classList.add('hidden');
        aiResponse.classList.remove('hidden');
        aiResponse.innerHTML = `
            <div style="color: var(--color-error);">
                <h4>Fehler bei der KI-Analyse</h4>
                <p>Es gab ein Problem bei der Verbindung zur KI-Analyse. Bitte versuchen Sie es später noch einmal.</p>
                <p><small>Technische Details: ${error.message}</small></p>
            </div>
        `;
        showToast('Fehler bei der KI-Analyse', 'error');
    }
}

function createAnalysisPrompt(formData) {
    let prompt = `Als erfahrener Pädagoge analysiere bitte diese Unterrichtsbeobachtung zur Dimension "${formData.title}". 

Beobachtungsdaten basierend auf ausgewählten Bewertungssätzen:
`;

    Object.entries(formData.categories).forEach(([categoryName, categoryData]) => {
        if (categoryData.selectedSentences.length > 0 || categoryData.customNotes) {
            prompt += `\n**${categoryName}:**\n`;
            
            if (categoryData.selectedSentences.length > 0) {
                const groupedSentences = {
                    positive: categoryData.selectedSentences.filter(s => s.type === 'positive'),
                    neutral: categoryData.selectedSentences.filter(s => s.type === 'neutral'),
                    development: categoryData.selectedSentences.filter(s => s.type === 'development')
                };

                if (groupedSentences.positive.length > 0) {
                    prompt += `*Positive Aspekte:*\n`;
                    groupedSentences.positive.forEach(sentence => {
                        prompt += `- ${sentence.text}\n`;
                    });
                }

                if (groupedSentences.neutral.length > 0) {
                    prompt += `*Neutrale Bewertungen:*\n`;
                    groupedSentences.neutral.forEach(sentence => {
                        prompt += `- ${sentence.text}\n`;
                    });
                }

                if (groupedSentences.development.length > 0) {
                    prompt += `*Entwicklungsfelder:*\n`;
                    groupedSentences.development.forEach(sentence => {
                        prompt += `- ${sentence.text}\n`;
                    });
                }
            }

            if (categoryData.customNotes) {
                prompt += `*Zusätzliche Beobachtungen:* ${categoryData.customNotes}\n`;
            }
        }
    });

    if (formData.additionalNotes) {
        prompt += `\n**Sonstige Beobachtungen:**\n${formData.additionalNotes}\n`;
    }

    prompt += `\nBitte geben Sie eine strukturierte pädagogische Analyse mit folgenden Punkten:

1. **Gesamteinschätzung:** Wie ist die Situation in dieser Dimension zu bewerten?
2. **Stärken:** Was läuft besonders gut basierend auf den ausgewählten positiven Bewertungen?
3. **Entwicklungsfelder:** Welche Bereiche benötigen Aufmerksamkeit basierend auf den markierten Entwicklungsfeldern?
4. **Konkrete Empfehlungen:** Spezifische, umsetzbare Verbesserungsvorschläge
5. **Fazit:** Wichtigste Erkenntnisse und nächste Schritte

Antworten Sie auf Deutsch und fokussieren Sie sich auf konstruktive, praxisorientierte Hinweise. Berücksichtigen Sie dabei die Gewichtung der verschiedenen Bewertungstypen.`;

    return prompt;
}

async function callPerplexityAPI(prompt) {
    const response = await fetch(PERPLEXITY_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [
                {
                    role: 'system',
                    content: 'Sie sind ein erfahrener Pädagoge und Unterrichtsforscher, der konstruktive Feedback und Analysen zu Unterrichtsbeobachtungen gibt.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.1,
            max_tokens: 2000
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

function formatAIResponse(response) {
    // Simple markdown-like formatting
    let formatted = response
        .replace(/\*\*(.*?)\*\*/g, '<h4>$1</h4>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n- /g, '</p><ul><li>')
        .replace(/\n\d+\. /g, '</p><ol><li>')
        .replace(/(\d+\.\s.*?)(\n|$)/g, '<li>$1</li>')
        .replace(/(-\s.*?)(\n|$)/g, '<li>$1</li>')
        .replace(/<\/p><ul>/g, '</p><ul>')
        .replace(/<\/p><ol>/g, '</p><ol>');

    // Wrap in paragraphs
    formatted = '<p>' + formatted + '</p>';
    
    // Close lists
    formatted = formatted.replace(/<li>([^<]*?)(<\/p>|$)/g, '<li>$1</li></ul>');
    
    return formatted;
}

function closeAIModal() {
    aiModal.classList.add('hidden');
}

function generatePDF() {
    const formData = collectFormData();
    
    // Check if there's any data to export
    const hasData = Object.values(formData.categories).some(category => 
        category.selectedSentences.length > 0 || category.customNotes
    ) || formData.additionalNotes;

    if (!hasData) {
        showToast('Bitte wählen Sie zuerst einige Bewertungen aus oder fügen Sie Notizen hinzu', 'warning');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set font
        doc.setFont('helvetica');
        
        // Title
        doc.setFontSize(20);
        doc.text(formData.title, 20, 30);
        
        // Date
        doc.setFontSize(10);
        doc.text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, 20, 40);
        
        let yPosition = 60;
        
        // Categories
        Object.entries(formData.categories).forEach(([categoryName, categoryData]) => {
            if (categoryData.selectedSentences.length > 0 || categoryData.customNotes) {
                // Check if we need a new page
                if (yPosition > 240) {
                    doc.addPage();
                    yPosition = 30;
                }

                // Category header
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text(categoryName, 20, yPosition);
                yPosition += 10;
                
                // Category description
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                const descLines = doc.splitTextToSize(categoryData.description, 170);
                doc.text(descLines, 20, yPosition);
                yPosition += descLines.length * 5 + 5;
                
                // Selected sentences by type
                const groupedSentences = {
                    positive: categoryData.selectedSentences.filter(s => s.type === 'positive'),
                    neutral: categoryData.selectedSentences.filter(s => s.type === 'neutral'),
                    development: categoryData.selectedSentences.filter(s => s.type === 'development')
                };

                const groupTitles = {
                    positive: 'Positive Bewertungen:',
                    neutral: 'Neutrale Bewertungen:',
                    development: 'Entwicklungsfelder:'
                };

                Object.entries(groupedSentences).forEach(([type, sentences]) => {
                    if (sentences.length > 0) {
                        // Check if we need a new page
                        if (yPosition > 220) {
                            doc.addPage();
                            yPosition = 30;
                        }

                        doc.setFontSize(12);
                        doc.setFont('helvetica', 'bold');
                        doc.text(groupTitles[type], 25, yPosition);
                        yPosition += 8;

                        doc.setFont('helvetica', 'normal');
                        sentences.forEach(sentence => {
                            if (yPosition > 250) {
                                doc.addPage();
                                yPosition = 30;
                            }
                            
                            const sentenceLines = doc.splitTextToSize(`• ${sentence.text}`, 165);
                            doc.text(sentenceLines, 30, yPosition);
                            yPosition += sentenceLines.length * 5 + 2;
                        });
                        yPosition += 5;
                    }
                });
                
                // Custom notes
                if (categoryData.customNotes) {
                    if (yPosition > 200) {
                        doc.addPage();
                        yPosition = 30;
                    }
                    
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Zusätzliche Beobachtungen:', 25, yPosition);
                    yPosition += 8;
                    
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    const notesLines = doc.splitTextToSize(categoryData.customNotes, 165);
                    doc.text(notesLines, 30, yPosition);
                    yPosition += notesLines.length * 5 + 10;
                }
                
                yPosition += 10;
            }
        });
        
        // Additional notes
        if (formData.additionalNotes) {
            if (yPosition > 200) {
                doc.addPage();
                yPosition = 30;
            }
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Sonstige Beobachtungen', 20, yPosition);
            yPosition += 10;
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const notesLines = doc.splitTextToSize(formData.additionalNotes, 170);
            doc.text(notesLines, 20, yPosition);
        }
        
        // Save PDF
        const fileName = `${formData.category}_bewertung_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        showToast('PDF-Bericht erfolgreich erstellt', 'success');
    } catch (error) {
        console.error('PDF Generation Error:', error);
        showToast('Fehler bei der PDF-Erstellung', 'error');
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Error handling for unhandled errors
window.addEventListener('error', function(e) {
    console.error('Unhandled error:', e.error);
    showToast('Ein unerwarteter Fehler ist aufgetreten', 'error');
});

// Service worker registration (optional, for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Only register if we have a service worker file
        // navigator.serviceWorker.register('/sw.js');
    });
}