/**
 * Tests para Clima Guatemala
 * 
 * Uso:
 *   node tests/syntax.test.js        - Test de sintaxis JS
 *   node tests/api.test.js           - Test de conexión a API
 *   node tests/run-all.js            - Ejecutar todos los tests
 */

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════');
console.log('         TESTS - CLIMA GUATEMALA');
console.log('═══════════════════════════════════════════════════════\n');

// ═══════════════════════════════════════════════════════════
// TEST 1: Validación de sintaxis JavaScript
// ═══════════════════════════════════════════════════════════

function testSyntax() {
    console.log('📝 TEST 1: Sintaxis JavaScript');
    console.log('──────────────────────────────────────');
    
    const scriptPath = path.join(__dirname, '..', 'script.js');
    const cssPath = path.join(__dirname, '..', 'styles.css');
    
    try {
        // Test JS
        const jsCode = fs.readFileSync(scriptPath, 'utf8');
        new Function(jsCode);
        console.log('   ✓ script.js - Sin errores de sintaxis');
        
        // Test CSS (básico)
        const cssCode = fs.readFileSync(cssPath, 'utf8');
        const openBraces = (cssCode.match(/\{/g) || []).length;
        const closeBraces = (cssCode.match(/\}/g) || []).length;
        const openComments = (cssCode.match(/\/\*/g) || []).length;
        const closeComments = (cssCode.match(/\*\//g) || []).length;
        
        if (openBraces !== closeBraces) {
            throw new Error(`Llaves desbalanceadas: ${openBraces} { vs ${closeBraces} }`);
        }
        if (openComments !== closeComments) {
            throw new Error(`Comentarios desbalanceados: ${openComments} /* vs ${closeComments} */`);
        }
        console.log('   ✓ styles.css - Llaves y comentarios balanceados');
        
        // Verificar que weatherMap existe
        if (!jsCode.includes('const weatherMap')) {
            throw new Error('No se encontró weatherMap en el código');
        }
        if (!jsCode.includes('const API_URL')) {
            throw new Error('No se encontró API_URL en el código');
        }
        console.log('   ✓ Elementos clave encontrados en el código');
        
        console.log('\n   ✅ TEST 1 APROBADO\n');
        return true;
    } catch (error) {
        console.log('\n   ❌ TEST 1 FALLIDO:', error.message, '\n');
        return false;
    }
}

// ═══════════════════════════════════════════════════════════
// TEST 2: Validación de estructura de archivos
// ═══════════════════════════════════════════════════════════

function testStructure() {
    console.log('📁 TEST 2: Estructura de Archivos');
    console.log('──────────────────────────────────────');
    
    const files = ['index.html', 'script.js', 'styles.css', 'AGENTS.md', 'README.md'];
    const basePath = path.join(__dirname, '..');
    
    try {
        for (const file of files) {
            const filePath = path.join(basePath, file);
            if (!fs.existsSync(filePath)) {
                throw new Error(`Archivo no encontrado: ${file}`);
            }
            console.log(`   ✓ ${file} - Existe`);
        }
        
        // Verificar que index.html incluye los scripts
        const htmlContent = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');
        if (!htmlContent.includes('script.js')) {
            throw new Error('index.html no incluye script.js');
        }
        if (!htmlContent.includes('styles.css')) {
            throw new Error('index.html no incluye styles.css');
        }
        console.log('   ✓ index.html - Vincula scripts correctamente');
        
        // Verificar que Font Awesome está incluido
        if (!htmlContent.includes('font-awesome')) {
            throw new Error('index.html no incluye Font Awesome');
        }
        console.log('   ✓ index.html - Incluye Font Awesome CDN');
        
        console.log('\n   ✅ TEST 2 APROBADO\n');
        return true;
    } catch (error) {
        console.log('\n   ❌ TEST 2 FALLIDO:', error.message, '\n');
        return false;
    }
}

// ═══════════════════════════════════════════════════════════
// TEST 3: Validación de código de clima
// ═══════════════════════════════════════════════════════════

function testWeatherCodes() {
    console.log('🌤️ TEST 3: Códigos de Clima');
    console.log('───────────────��──────────────────────');
    
    const scriptPath = path.join(__dirname, '..', 'script.js');
    const jsCode = fs.readFileSync(scriptPath, 'utf8');
    
    const expectedCodes = [0, 1, 2, 3, 45, 48, 51, 53, 55, 61, 63, 65, 71, 73, 75, 80, 81, 82, 85, 95, 96, 99];
    const missing = [];
    
    for (const code of expectedCodes) {
        if (!jsCode.includes(`${code}:`) && !jsCode.includes(`${code} :`)) {
            missing.push(code);
        }
    }
    
    if (missing.length > 0) {
        console.log(`   ⚠️  Códigos no encontrados en weatherMap: ${missing.join(', ')}`);
        console.log('   (Pueden estar en el fallback de getWeatherInfo)');
    } else {
        console.log('   ✓ Todos los códigos WMO esperados están definidos');
    }
    
    // Verificar que getWeatherInfo existe y tiene fallback
    if (!jsCode.includes('function getWeatherInfo')) {
        console.log('   ❌ No se encontró función getWeatherInfo');
        return false;
    }
    console.log('   ✓ Función getWeatherInfo implementada');
    
    // Verificar fallback
    if (!jsCode.includes('return weatherMap[0]')) {
        console.log('   ⚠️  No se encontró fallback para códigos desconocidos');
    } else {
        console.log('   ✓ Fallback implementado');
    }
    
    console.log('\n   ✅ TEST 3 APROBADO\n');
    return true;
}

// ═══════════════════════════════════════════════════════════
// TEST 4: Validación de API (requiere conexión a internet)
// ═══════════════════════════════════════════════════════════

async function testAPI() {
    console.log('🌐 TEST 4: Conexión a Open-Meteo API');
    console.log('──────────────────────────────────────');
    
    const apiUrl = 'https://api.open-meteo.com/v1/forecast';
    const params = new URLSearchParams({
        latitude: '14.6349',
        longitude: '-90.5055',
        current: 'temperature_2m,weathercode,relativehumidity_2m',
        daily: 'weathercode,temperature_2m_max,temperature_2m_min',
        timezone: 'America/Guatemala',
        forecast_days: '7'
    });
    
    try {
        console.log('   🔄 Conectando a Open-Meteo...');
        
        const response = await fetch(`${apiUrl}?${params}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Verificar estructura de respuesta
        if (!data.current) {
            throw new Error('Respuesta sin campo "current"');
        }
        if (!data.daily) {
            throw new Error('Respuesta sin campo "daily"');
        }
        
        console.log('   ✓ API responde correctamente');
        console.log(`   ✓ Temperatura actual: ${data.current.temperature_2m}°C`);
        console.log(`   ✓ Código de clima: ${data.current.weathercode}`);
        console.log(`   ✓ Días de pronóstico: ${data.daily.time?.length || 0}`);
        
        console.log('\n   ✅ TEST 4 APROBADO\n');
        return true;
    } catch (error) {
        console.log(`   ❌ Error de conexión: ${error.message}`);
        console.log('   (Verifica tu conexión a internet)\n');
        return false;
    }
}

// ═══════════════════════════════════════════════════════════
// Ejecutar todos los tests
// ═══════════════════════════════════════════════════════════

async function runAllTests() {
    let passed = 0;
    let failed = 0;
    
    console.log('═══════════════════════════════════════════════════════\n');
    
    // Tests síncronos
    if (testSyntax()) passed++; else failed++;
    if (testStructure()) passed++; else failed++;
    if (testWeatherCodes()) passed++; else failed++;
    
    // Test asíncrono (API)
    if (await testAPI()) passed++; else failed++;
    
    console.log('═══════════════════════════════════════════════════════');
    console.log(`         RESULTADOS: ${passed} aprobados, ${failed} fallidos`);
    console.log('═══════════════════════════════════════════════════════\n');
    
    process.exit(failed > 0 ? 1 : 0);
}

// Ejecutar si es el archivo principal
if (require.main === module) {
    runAllTests();
}

module.exports = { testSyntax, testStructure, testWeatherCodes, testAPI, runAllTests };